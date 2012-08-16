Ext.define("SiteSelector.store.Sites", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Site", "Ext.data.proxy.LocalStorage"],
	alias: "store.sites",
	config: {
		model: "SiteSelector.model.Site",
		autoLoad: true,
		proxy: {
			type: 'localstorage',
			id: 'rotator-app-store-site',
		},
		sorters: 'when',
		listeners: {
			write: 'exportFile',
			beforesync: 'onBeforeSync'
		}
	},
	lastSite: function(kind) {
		var $this = this;
		var last_record = false;
		this.findBy(function(record, id) {
			if (record.get("kind") == kind && record.get("removed") == null) {
				last_record = record;
			}
		});
		return last_record;
	},
	
	exportFile: function(store) {
		var $this = this;
		var writeDocument = function(filename, fnSuccess, fnFail) {
			if (window.requestFileSystem) {
				window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fileSystem) {
					fileSystem.root.getFile(filename, {create: true, exclusive: false}, function(fileEntry) {
						fileEntry.createWriter(fnSuccess, fnFail);
					}, fnFail);
				},  fnFail);
			} else {
				console.log("No File I/O available: Is Phonegap loaded?");
				fnFail();
			}
		};
		
		writeDocument("sites.csv", function(writer) {
			var fields = ["kind", "when", "removed", "side", "location"];
			var display = { kind: "Type", when: "Inserted", removed: "Removed", side: "Side", location: "Location" };
			var buffer = "";
			var record_buffer = [];
			for (var f in fields) {
				record_buffer.push(display[fields[f]]);
			}
			buffer += record_buffer.join() + "\n";
			$this.each(function(r) {
				var record_buffer = [];
				for (var f in fields) {
					var v = r.get(fields[f]);
					if (typeof v == "null") v = "";
					record_buffer.push(v);
				}
				buffer += record_buffer.join() + "\n";
			});
			writer.write(buffer);
			writer.onwrite = function() { console.log("refreshed export.csv"); }
			writer.onwriteend = function() { console.log("closed export.csv"); }
		}, function() {
			console.log("Error writing file");
		});
	},
	
	onBeforeSync: function (store) {
		var logStore = Ext.data.StoreManager.get("Logs");
		store.getUpdatedRecords().forEach(function(m) {
			for (var field in m.modified) {
				if (field == "removed") {
					// if we're modifying the removal date, delete old one from log and create anew
					logStore.each(function(r) {
						if (r.get("title") == "Site Removed" && r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Site") {
							logStore.remove(r);
						}
					})
					logStore.record(m, "Site Removed", "The " + m.get("kind") + " site was removed from " + m.get("location"), { date_field: "removed" });
					LocalNotification.cancel(m.getId() + "-0");
					LocalNotification.cancel(m.getId() + "-1");
				}
			}
		});
		var siteReminderText = function(m, hours_early) {
			if (m.get("kind") == "pump") {
				if (hours_early > 0) {
					return "It'll be time to change your pump in " + hours_early + " hour" + (hours_early > 1? "s": "");
				} else {
					return "It's time to change your pump";
				}
			} else if (m.get("kind") == "cgm") {
				if (hours_early > 0) {
					return "It'll be time to change your CGM in " + hours_early + " hour" + (hours_early > 1? "s": "");
				} else {
					return "It's time to change your CGM";
				}
			} else if (m.get("kind") == "shot_basal") {
				if (hours_early > 0) {
					return "It'll be time to take a basal shot in " + hours_early + " hour" + (hours_early > 1? "s": "");
				} else {
					return "It's time to take a basal shot";
				}
			}
		}
		store.getNewRecords().forEach(function(m) {
			logStore.record(m, "Site Inserted", "New " + m.get("kind") + " site was inserted at " + m.get("location"));
			
			if (SiteSelector.app.settings().get("usereminders")) {
				var effective = Date.now() / 1000 + m.lasts() * 86400;
				var reminders = [
					SiteSelector.app.settings().quietAdjustedTime(effective),
					SiteSelector.app.settings().quietAdjustedTime(effective - 1000 * 60 * 60 * 4)
				].unique(); // in case reminder is during quiet period and both would fire at same time
				
				var scheduler = function(deliver, message, m) {
					var inner = (function() {
						if (m.phantom) return setTimeout(inner, 500);
					
						LocalNotification.add({ 
							date: deliver, 
							message: message, 
							badge: 0, 
							id: m.getId().toString() + "-" + reminders.indexOf(deliver) 
						});					
					});
					inner();
				}
				
				reminders.forEach(function(at_time) {
					var hours_early = Math.floor((effective.getTime() - at_time.getTime()) / (1000 * 60 * 60));
					scheduler(at_time, siteReminderText(m, hours_early), m);
				})
			}
		});
		store.getRemovedRecords().forEach(function(m) {
			LocalNotification.cancel(m.getId() + "-0");
			LocalNotification.cancel(m.getId() + "-1");
			
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Site") {
					logStore.remove(r);
				}
			});
		});
		logStore.sync();
	},
	
	backport_logs: function() {
		var logStore = Ext.data.StoreManager.get("Logs");
		this.each(function(m) {
			if (m.data.when)
				logStore.add({
					model: m.stores[0].getModel().getName(),
					fk: m.getId(),
					when: m.get("when"),
					title: "Site Inserted",
					description: "New " + m.get("kind") + " site was inserted at " + m.get("location")
				});
			if (m.data.removed)
				logStore.add({
					model: m.stores[0].getModel().getName(),
					fk: m.getId(),
					when: m.get("removed"),
					title: "Site Removed",
					description: "The " + m.get("kind") + " site was removed from " + m.get("location")
				});
		});
		logStore.sync();
	},
	
	recompute_locations: function() {
		this.each(function(m) {
			m.set("location,", new SiteSelector.model.BodyRegion().regionName(100 * m.get("x"), 100 * m.get("y"), m.get("side")));
		}, this);
		this.sync();
	}
});