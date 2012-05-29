Ext.define("SiteSelector.store.Settings", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Setting", "Ext.data.proxy.LocalStorage"],
	alias: "store.settings",
	config: {
		model: "SiteSelector.model.Setting",
		autoLoad: true,
	    proxy: {
	        type: 'localstorage',
	        id: 'rotator-app-store-settings'
	    },
		listeners: {
			beforesync: 'onBeforeSync'
		}
	},
	
	onBeforeSync: function(store) {
		store.getUpdatedRecords().forEach(function(m) {
			m.updateUserBloodSugarUnits()
		});
	}
});