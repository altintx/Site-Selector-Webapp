Ext.define("SiteSelector.view.MealGallery", {
	extend: "Ext.Panel",
	alias: "widget.meal_gallery",
	config: {
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
			},
			{
				xtype: "list",
				itemTpl: '<div><img src="{file_uri}" style="width: 0.75in; height: 1in" float="left" />{description}</div>',
				border: 4,
				listeners: {
					itemtap: function(view, index, target, record) {
						var gallery = view.up("mealgallery");
						gallery.meal.set({
							description: record.get("description"),
							carb_count: record.get("carb_count")
						})
						gallery.fireEvent("repeat", gallery.meal);
						gallery.hide();
						setTimeout(function() {
							gallery.destroy();
						}, 10);
					}
				}
			}
		]
	},
	
	constructor: function(config) {
		var meal = config.meal;
		delete config.meal;
		this.callParent([config]);
		this.meal = meal;
	}
});