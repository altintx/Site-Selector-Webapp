Ext.define("SiteSelector.view.Geolocator", {
	alias: "widget.geolocator",
	extend: "Ext.Panel",
	requires: ["SiteSelector.store.Nearby"],
	config: {
		layout: "fit",
		items: [
			{
				xtype: "component",
				style: "background-color: #222;color: #eee; font-size:120%; text-align:center;",
				height: "1.5em",
				docked: "top",
				html: "Where are you eating?"
			},
			{
				xtype: "list",
				itemTpl: "<div>{name}</div>",
				store: "Nearby",
				border: 4,
				listeners: {
					itemtap: function(list, ix, dataitem, record_venue, ev) {
						var geolocator = list.up("geolocator");
						var meal = geolocator.meal;
						geolocator.fireEvent("checkin", list, record_venue, meal);
						geolocator.hide();
						setTimeout(function() { 
							geolocator.destroy();
						}, 10);				
					}
				},
				items: [
					{
						xtype: "fieldset",
						defaults: {
							labelWidth: "60%"
						},
						style: "margin-bottom: 0;",
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
						bottom: 0,
						width: 482,
						height: 121
					}
				]
			}
		]
	},
	constructor: function(config) {
		this.callParent([config]);
		this.meal = config.meal;
		this.list = this.down("list");
		this.list.getStore().getNearby();
		this.down("checkboxfield").on({
			check: this.filterRestaurantsOnly,
			uncheck: this.clearFilter,
			scope: this
		});
		this.filterRestaurantsOnly();
	},
	filterRestaurantsOnly: function() {
		this.list.getStore().clearFilter();
		this.list.getStore().filter(new Ext.util.Filter({
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
		this.list.getStore().clearFilter();
	}
});