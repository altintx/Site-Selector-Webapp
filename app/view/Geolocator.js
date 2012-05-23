Ext.define("SiteSelector.view.Geolocator", {
	alias: "widget.geolocator",
	extend: "Ext.List",
	requires: ["SiteSelector.store.Nearby"],
	config: {
		itemTpl: "<div>{name}</div>",
		store: "Nearby",
		items: [
			{
				xtype: "container",
				style: "background-color: #222;",
				height: "0.675in",
				docked: "bottom",
				width: "100%",
				items: [
					{
						xtype: "img",
						alt: "Powered by FourSquare",
						src: "resources/images/foursquare.png",
						top: -30,
						right: "25%",
						left: "25%",
						bottom: 0
					}
				]
			},
			{
				xtype: "component",
				style: "background-color: #222;color: #eee; font-size:120%; text-align:center;",
				height: "1.5em",
				docked: "top",
				html: "Where are you eating?"
			},
			{
				xtype: "fieldset",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'checkboxfield',
						label: 'Edible Categories Only',
						name: "restaurants",
						checked: true
					}
				]
			}
		]
	},
	constructor: function(config) {
		this.callParent([config]);
		this.getStore().getNearby();
		this.down("checkboxfield").on({
			check: this.filterRestaurantsOnly,
			uncheck: this.clearFilter,
			scope: this
		});
		this.filterRestaurantsOnly();
	},
	filterRestaurantsOnly: function() {
		this.getStore().clearFilter();
		this.getStore().filter(new Ext.util.Filter({
		    filterFn: function(item) {
				return ((item.raw.categories || []).filter(function(cat) {
					return (cat.icon.prefix.toString().indexOf("food") > -1) || 
					/restaurant/i.test(cat.name) 
				}).length > 0) ||
				/-11111111/.test(item.data.id);
		    }
		}))

	},
	clearFilter: function() {
		this.getStore().clearFilter();
	}
});