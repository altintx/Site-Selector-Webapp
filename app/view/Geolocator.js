Ext.define("SiteSelector.view.Geolocator", {
	alias: "widget.geolocator",
	extend: "Ext.List",
	requires: ["SiteSelector.store.Nearby"],
	config: {
		itemTpl: "<div><strong>{name}</strong> ({distance})</div>",
	},
	
	constructor: function(config) {
		var store = new SiteSelector.store.Nearby();
		store.getNearby()
		config.store = store;
		this.callParent([config]);
	}
});