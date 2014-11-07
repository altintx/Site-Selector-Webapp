Ext.define("SiteSelector.view.tablet.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
		'Ext.TitleBar', 
		'SiteSelector.store.Sites', 
		"Ext.Anim"
	],
    alias: "widget.Main",
    config: {
		root: true,
        tabBarPosition: 'bottom',
		fullScreen: true,
        items: [
			{
				xtype: "container",
				layout: "hbox",
				iconCls: "user",
				title: "Sites",
				alias: "sites",
				items: [
		           	{
						xtype: "BodyList",
						title: "Front",
						side: "front",
						flex: 1
					},
		           	{
						xtype: "BodyList",
						title: "Back",
						side: "back",
						flex: 1
					}
				]
			},
			{
				xtype: "LogViewer",
				title: "Log",
				store: "Logs"
			},
			// {
			// 	xtype: "ReportBrowser",
			// 	title: "Reports",
			// 	iconCls: "info"
			// },
			{
				xtype: "Settings"
			}
        ]
    },

	constructor: function(config) {
		var attachStore = function(item) {
			if (["BodyList"].indexOf(item.xtype) > -1)
				item.store = Ext.getStore('Sites');
			else if (item.items && item.items.length)
				item.items.forEach(attachStore);
		};
		this.config.items.forEach(attachStore);
		this.callParent(arguments);
	},

	switchTo: function(alias) {
		this.setActiveItem(this.down("container[alias=sites]"));
	}
});