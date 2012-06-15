Ext.define("SiteSelector.view.Homescreen", {
    extend: 'Ext.Panel',
    requires: [
		"Ext.Anim",
		"SiteSelector.view.bloodsugar.QuickAdd"
	],
    alias: "widget.homescreen",
    config: {
		root: true,
		fullScreen: true,
		layout: "vbox",
		items: [
			{
				xtype: "quickbloodsugar",
				flex: 1
			},
			{
				xtype: "container",
				layout: "hbox",
				flex: 2,
				items: [
					{
						text: "Insulin",
						xtype: "button",
						flex: 1,
						handler: function() {
							this.up("navigationview").push({
								xtype: "addinsulin"
							})
						}
					},
					{
						text: "Eat",
						flex: 1,
						xtype: "button",
						handler: function() {
							this.up("navigationview").push({
								xtype: "addfood"
							})
						}
					},
					{
						xtype: "button",
						text: "Sites",
						flex: 1,
						handler: function() {
							this.up("navigationview").push({
								xtype: "bodypanel" + Ext.Viewport.getOrientation(),
								title: "Sites"
							})
						}
					}
				]
			},
			{
				xtype: "container",
				flex: 2,
				layout: "hbox",
				items: [
					{
						text: "Exercise",
						flex: 1,
						xtype: "button",
						handler: function() {
							this.up("navigationview").push({
								xtype: "addexercise"
							})
						}
					},
					{
						text: "Blood Sugar",
						flex: 1,
						xtype: "button"
					},
					{
						text: "Log",
						xtype: "button",
						flex: 1,
						handler: function() {
							this.up("navigationview").push({
								xtype: "LogViewer",
								title: "Log"
							})
						}
					},
					{
						text: "Settings",
						xtype: "button",
						flex: 1,
						handler: function() {
							this.up("navigationview").push({
								xtype: "Settings",
								title: "Settings"
							})
						}
					}
				]
			}
		]
	}
});