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
	lastSite: function(side, kind) {
		var $this = this;
		var last_record = false;
		this.findBy(function(record, id) {
			if (record.get("side") == side && record.get("kind") == kind && record.get("removed") == null) {
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
		
		writeDocument("export.csv", function(writer) {
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
		// writeDocument("export.xls", function(writer) {
		// 	var fields = ["kind", "when", "removed", "map", "side", "location"];
		// 	var display = { kind: "Type", when: "Inserted", removed: "Removed", map: "Map", side: "Side", location: "Location" };
		// 	var buffer = "<html><head><title>SiteSelector Log</title></head><body><table>";
		// 	var record_buffer = [];
		// 	for (var f in fields) {
		// 		record_buffer.push(display[fields[f]]);
		// 	}
		// 	buffer += ("<tr><td>" + record_buffer.join("</td><td>") + "</td></tr>");
		// 	$this.each(function(r) {
		// 		var record_buffer = [];
		// 		for (var f in fields) {
		// 			var v;
		// 			if (fields[f] == "map") {
		// 				v = "<div style='position:relative'>";
		// 				v += "<img src=\"body-map.png\" width=\"100\" height=\"300\" />";
		// 				v += "</div>";
		// 			} else {
		// 				v = r.get(fields[f]);
		// 				if (typeof v == "null") v = "";
		// 			}
		// 			record_buffer.push(v);
		// 		};
		// 		buffer += ("<tr><td>" + record_buffer.join("</td><td>") + "</td></tr>");
		// 	});
		// 	buffer += "</table></body></html>";
		// 	writer.write(buffer);
		// 	writer.onwrite = function() { console.log("refreshed export.csv"); }
		// 	writer.onwriteend = function() { console.log("closed export.csv"); }
		// }, function() {
		// 	console.log("Error writing file");
		// });
	},
	
	onBeforeSync: function (store) {
		var field;
		try {
			store.getUpdatedRecords().forEach(function(m) {
				for (field in m.modified) {
					if (field == "removed") {
						Ext.data.StoreManager.get("Logs").record(m, "Site Removed", "The " + m.get("kind") + " site was removed from " + m.get("location"));
						(new LocalNotification()).cancel(m.getId());
					}
				}
			});
			store.getNewRecords().forEach(function(m) {
				// TODO: log if new site
				Ext.data.StoreManager.get("Logs").record(m, "Site Inserted", "New " + m.get("kind") + " site was inserted at " + m.get("location"));
				
				if (SiteSelector.app.settings().get("usereminders")) {
					try {
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
					} catch (e) {
						console.log("Local Notifications not supported");
					}

				}
			});
			store.getRemovedRecords().forEach(function(m) {
				try {
					(new LocalNotification()).cancel(m.getId());
				} catch (e) {
					console.log("Error cancelling notification", e);
				}
				
				try {
					var logs = Ext.data.StoreManager.get("Logs");
					logs.each(function(r) {
						if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Site") {
							console.log("removing", r);
							logs.remove(r);
						}
					});
				} catch (e) {
					console.log("Error removing logs", e);
				}
			});
		} catch (e) {
			console.log("Exception in SitesStore::onBeforeSync", e);
		}
	}
});