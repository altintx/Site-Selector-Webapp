Ext.define("SiteSelector.view.tablet.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
		'Ext.TitleBar', 
		'SiteSelector.store.Sites', 
		"Ext.Anim",
		"SiteSelector.view.BodyList",
		"SiteSelector.view.LogViewer",
		"SiteSelector.view.Settings"
	],
    alias: "widget.Main",
    config: {
		root: true,
        tabBarPosition: 'bottom',
		fullScreen: true,
        tabBar: {
			defaults: {
				height: "100px"
		
			}
		},
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
						alias: "front",
						flex: 1
					},
		           	{
						xtype: "BodyList",
						title: "Back",
						alias: "back",
						flex: 1
					}
				]
			},
			{
				xtype: "LogViewer",
				title: "Log",
				store: "Logs"
			},
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