Ext.define("SiteSelector.view.MealGallery", {
	extend: "Ext.dataview.List",
	alias: "widget.meal_gallery",
	config: {
		itemTpl: '<div><img src="{file_uri}" style="width: 0.75in; height: 1in" float="left" />{description}</div>',
		listeners: {
			itemtap: function(view, index, target, record) {
				view.fireEvent("reusemealtemplate", record, this.meal);
				view.up("navigationview").pop();
			}
		}
	},
	
	constructor: function(config) {
		var meal = config.meal;
		delete config.meal;
		this.callParent([config]);
		this.meal = meal;
	}
});