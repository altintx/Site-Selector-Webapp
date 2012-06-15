Ext.define("SiteSelector.view.tablet.Main", {
    extend: 'Ext.navigation.View',
    requires: ["Ext.Anim", "SiteSelector.view.Homescreen"],
    alias: "widget.Main",
    config: {
		root: true,
		fullScreen: true,
		items: [
			{
				title: "Diabetic Boss",
				xtype: "homescreen"
			}
		],
		listeners: {
			back: function(navView, options) {
				console.log(navView);
			}
		}
	}
});