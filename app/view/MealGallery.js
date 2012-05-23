Ext.define("SiteSelector.view.MealGallery", {
	extend: "Ext.List",
	alias: "widget.meal_gallery",
	config: {
		itemTpl: '<div><img src="{file_uri}" style="width: 0.75in; height: 1in" float="left" />{when}<br />{description}</div>'
	}
});