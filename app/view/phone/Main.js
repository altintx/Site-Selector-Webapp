Ext.define("SiteSelector.view.phone.Main", {
    extend: 'Ext.tab.Panel',
    requires: [
		'Ext.TitleBar', 
		'SiteSelector.store.Sites',
		"SiteSelector.view.BodyList",
		"SiteSelector.view.LogViewer",
		"SiteSelector.view.Settings"
		
	],
    alias: "widget.Main",	
    config: {
		root: true,
        tabBarPosition: 'bottom',
        
        items: [
           	{
				xtype: "BodyList",
				title: "Front",
				alias: "front",
			},
           	{
				xtype: "BodyList",
				title: "Back",
				alias: "back",
			},
			{
				xtype: "LogViewer",
				title: "Log",
				store: "Logs"
			},
			{
				xtype: "ReportBrowser",
				title: "Reports",
				iconCls: "info"
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
		this.setActiveItem(this.down("BodyList[alias=" + alias + "]"));
	}
});