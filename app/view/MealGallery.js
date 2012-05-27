Ext.define("SiteSelector.view.MealGallery", {
	extend: "Ext.List",
	alias: "widget.meal_gallery",
	config: {
		itemTpl: '<div><img src="{file_uri}" style="width: 0.75in; height: 1in" float="left" />{when}<br />{description}</div>',
		items: [
			{
				xtype: "titlebar",
				title: "One of these?",
				items: [
					{
						text: "Cancel",
						handler: function() {
							var view = this.up("meal_gallery");
							view.fireEvent("cancel", view);
							setTimeout(function() {
								view.destroy();
							}, 10);
						}
					},
					{
						text: "Skip",
						align: "right",
						handler: function() {
							var view = this.up("meal_gallery");
							view.fireEvent("skip", view.meal);
							setTimeout(function() {
								view.destroy();
							}, 10);
						}
					}
				]
			}
		],
		listeners: {
			itemtap: function(view, index, target, record) {
				view.meal.set({
					description: record.get("description"),
					carb_count: record.get("carb_count")
				})
				view.fireEvent("repeat", view.meal);
				setTimeout(function() {
					view.destroy();
				}, 10);
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