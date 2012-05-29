Ext.define("SiteSelector.store.BloodSugars", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.BloodSugar", "Ext.data.proxy.LocalStorage"],
	alias: "store.bloodsugars",
	config: {
		model: "SiteSelector.model.BloodSugar",
		autoLoad: true,
		proxy: {
			type: 'localstorage',
			id: 'rotator-app-store-bloodsugar',
		},
		sorters: 'when',
		listeners: {
			beforesync: 'onBeforeSync'
		}
	},
	
	onBeforeSync: function (store) {
		var field;
		var logStore = Ext.data.StoreManager.get("Logs");
		store.getUpdatedRecords().forEach(function(m) {
			var ix = logStore.findBy(function(r) {
				return (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.BloodSugar");
			})
			var r = logStore.getAt(ix);
			(function(expr) {
				r.set({
					title: expr,
					description: expr
				});
			})((m.get("kind") == "meter"? "#bgnow" : "#cgmow") + " " + m.get("reading"));
		});
		store.getNewRecords().forEach(function(m) {
			(function(expr) {
				logStore.record(m, expr, expr);
			})((m.get("kind") == "meter"? "#bgnow" : "#cgmow") + " " + m.get("reading"));
		});
		store.getRemovedRecords().forEach(function(m) {
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.BloodSugar") {
					console.log("removing", r);
					logStore.remove(r);
				}
			});
		});
		logStore.sync();			
	},
	
	mostRecent: function(kind) {
		var r = this.findRecord("kind", kind);
		return r.get("reading");
	},
	
	changeAllReadings: function(targetUnit, algorithms) {
		this.each(function(r) {
			var u = r.get("unit");
			if (u == targetUnit) {
				// done
			} else {
				r.set({
					reading: algorithms[u](r.get("reading")),
					unit: targetUnit
				});
			}
			
		});
		this.sync();
	}
});