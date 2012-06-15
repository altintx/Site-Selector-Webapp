Ext.define("SiteSelector.view.phone.BodyPanel", {
    extend: 'Ext.tab.Panel',
    requires: [
		'SiteSelector.store.Sites'
	],
    alias: "widget.bodypanelportrait",
    config: {
		root: true,
        tabBarPosition: 'bottom',
        
        items: [
           	{
				xtype: "BodyList",
				title: "Front",
				side: "front",
				store: "Sites"
			},
           	{
				xtype: "BodyList",
				title: "Back",
				side: "back",
				store: "Sites"
			}
        ]
    }
});