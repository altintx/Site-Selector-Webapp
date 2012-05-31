Ext.define("SiteSelector.store.Medications", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Bolus", "Ext.data.proxy.LocalStorage"],
	alias: "store.medications",
	config: {
		model: "SiteSelector.model.Bolus",
		autoLoad: true,
		proxy: {
			type: 'localstorage',
			id: 'rotator-app-store-medications',
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
				return (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Bolus");
			})
			var r = logStore.getAt(ix);
			
			var types = [], explain = [];
			if (m.get("normal"))
				types.push(m.get("normal") + "U bolus")
			if (m.get("wave"))
				types.push(m.get("wave") + "U wave");
			if (m.get("blood_sugar"))
				explain.push("#bgnow " + m.get("blood_sugar"));
			if (m.get("carbs"))
				explain.push(m.get("carbs") + "g of carbs");
				
			r.set({
				title: ("Took " + (m.data.wave + m.data.normal) + "U insulin"),
				description: "Took" + [types.join(" and "), explain.join(" and ")].join (" for ")
			});
		});
		store.getNewRecords().forEach(function(m) {
			var types = [], explain = [];
			if (m.get("normal"))
				types.push(m.get("normal") + "U bolus")
			if (m.get("wave"))
				types.push(m.get("wave") + "U wave");
			if (m.get("blood_sugar"))
				explain.push("#bgnow " + m.get("blood_sugar"));
			if (m.get("carbs"))
				explain.push(m.get("carbs") + "g of carbs");
			
			logStore.record(m, ("Took " + (m.data.wave + m.data.normal) + "U insulin"), "Took " + [types.join(" and "), explain.join(" and ")].join (" for "))
		});
		store.getRemovedRecords().forEach(function(m) {
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Bolus") {
					console.log("removing", r);
					logStore.remove(r);
				}
			});
		});
		logStore.sync();			
	}
});