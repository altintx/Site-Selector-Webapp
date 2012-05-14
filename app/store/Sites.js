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
				};
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
		var field;
		var logStore = Ext.data.StoreManager.get("Logs");
		store.getUpdatedRecords().forEach(function(m) {
			for (field in m.modified) {
				if (field == "removed") {
					// if we're modifying the removal date, delete old one from log and create anew
					logStore.each(function(r) {
						if (r.get("title") == "Site Removed" && r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Site") {
							logStore.remove(r);
						}
					})
					logStore.record(m, "Site Removed", "The " + m.get("kind") + " site was removed from " + m.get("location"), { date_field: "removed" });
					(new LocalNotification()).cancel(m.getId());
				}
			}
		});
		store.getNewRecords().forEach(function(m) {
			// TODO: log if new site
			logStore.record(m, "Site Inserted", "New " + m.get("kind") + " site was inserted at " + m.get("location"));
			
			if (SiteSelector.app.settings().get("usereminders")) {
				var nice = "";
				if (m.get("kind") == "pump") {
					nice = "pump";
				} else {
					nice = "CGM";
				}
				var slave = function() {
					if (m.phantom) {
						setTimeout(slave, 500);
						return;
					}
					(new LocalNotification()).add({ date: Date.now() / 1000 +  m.lasts() * 86400, message: 'It\'s time to change your ' + nice, badge: 0, id: m.getId().toString() });
				}
				slave();
			}
		});
		store.getRemovedRecords().forEach(function(m) {
			(new LocalNotification()).cancel(m.getId());
			
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Site") {
					console.log("removing", r);
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