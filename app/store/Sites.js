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
		sorters: 'when'
	},
	lastSite: function(side) {
		var $this = this;
		var last_record = false;
		this.findBy(function(record, id) {
			if (record.get("side") == side && record.get("removed") == null) {
				last_record = record;
			}
		});
		return last_record;
	}
});