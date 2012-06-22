Ext.define("SiteSelector.store.Exercises", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Exercise", "Ext.data.proxy.LocalStorage"],
	alias: "store.medications",
	config: {
		model: "SiteSelector.model.Exercise",
		autoLoad: false,
		proxy: {
			type: 'localstorage',
			id: 'rotator-app-store-exercise',
		},
		sorters: {
			property: 'when',
			direction: "desc"
		} ,
		listeners: {
			beforesync: 'onBeforeSync'
		}
	},
	
	onBeforeSync: function (store) {
		var field;
		var logStore = Ext.data.StoreManager.get("Logs");
		store.getUpdatedRecords().forEach(function(m) {
			var ix = logStore.findBy(function(r) {
				return (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Exercise");
			})
			var r = logStore.getAt(ix);
			
			if (m.get("ended")) {
				r.set({
					title: "Exercised for " + ((m.get("ended").getTime() - m.get("when").getTime()) / 60000) + "m",
					description: m.data.action + " for " + ((m.get("ended").getTime() - m.get("when").getTime()) / 60000) + " minutes"
				});
			}
		});
		store.getNewRecords().forEach(function(m) {
			logStore.record(m, "Exercising", m.data.action + " from " + m.data.when);
		});
		store.getRemovedRecords().forEach(function(m) {
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Exercise") {
					console.log("removing", r);
					logStore.remove(r);
				}
			});
		});
		logStore.sync();			
	}
});