Ext.define("SiteSelector.view.tablet.BodyPanel", {
    extend: 'Ext.Container',
    requires: [
		'SiteSelector.store.Sites', 
	],
    alias: "widget.bodypanellandscape",
    config: {
		layout: "hbox",
		iconCls: "user",
		title: "Sites",
		alias: "sites",
		items: [
           	{
				xtype: "BodyList",
				title: "Front",
				side: "front",
				flex: 1,
				store: "Sites"
			},
           	{
				xtype: "BodyList",
				title: "Back",
				side: "back",
				flex: 1,
				store: "Sites"
			}
		]
	}
});