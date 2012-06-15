Ext.define("SiteSelector.view.Viewport", {
    extend: 'Ext.navigation.View',
    requires: ["Ext.Anim", "SiteSelector.view.Homescreen"],
    alias: "widget.siteselectorviewport",
    config: {
		root: true,
		fullScreen: true,
		items: [
			{
				title: "Site Selector 3",
				xtype: "homescreen"
			}
		]
	}
});