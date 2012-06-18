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
				flex: 1,
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
							(function(view) {
								view.fireEvent("eat", view);
							})(this.up("navigationview"))
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
				flex: 1,
				layout: "hbox",
				items: [
					{
						text: "Exercise",
						flex: 1,
						xtype: "button",
						handler: function() {
							this.up("navigationview").push({
								xtype: "addexercise",
								title: "Exercise",
								record: new SiteSelector.model.Exercise({
									when: new Date()
								})
							})
						}
					},
					{
						text: "Log",
						xtype: "button",
						flex: 1,
						handler: function() {
							(function(view) {
								view.fireEvent("showlog", view);
							})(this.up("navigationview"))
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