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
				console.log("No access to the file system: Is Phonegap loaded?");
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
		store.getUpdatedRecords().forEach(function(m) {
			// TODO: log if site is removed
			console.log(m);
			for (field in m.modified) {
				if (field == "removed") {
					Ext.data.StoreManager.get("Logs").record(m, "Site Removed", "The " + m.get("kind") + " site was removed from " + m.get("location"));
				}
			}
		});
		store.getNewRecords().forEach(function(m) {
			// TODO: log if new site
			Ext.data.StoreManager.get("Logs").record(m, "Site Inserted", "New " + m.get("kind") + " site was inserted at " + m.get("location"));
			console.log(m);			
		});
		store.getRemovedRecords().forEach(function(m) {
			// TODO: delete from log if site is deleted
			Ext.data.StoreManager.get("Logs").remove(Ext.data.StoreManager.get("Logs").filterBy(function(r) {
				return (r.get("fk") == m.getId() && r.get("model") == m.getName());
			}));
			console.log(m);
		});
	}
});