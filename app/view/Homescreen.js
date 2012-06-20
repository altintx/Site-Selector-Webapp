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
							(function(view) {
								view.fireEvent("bolus", view);
							})(this.up("navigationview"))
						}
					},
					{
						text: "Eat",
						flex: 1,
						xtype: "button",
						html: '<img src="/resources/icons/homescreen/eat.png" style="width:1in;clear:both;" /><div>Eat</div>',
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
						html: '<img src="/resources/icons/homescreen/sites.png" style="width:1in;clear:both;" /><div>Sites</div>',
						handler: function() {
							(function(view) {
								view.fireEvent("show_sites", view);
							})(this.up("navigationview"))
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
						html: '<img src="/resources/icons/homescreen/exercise.png" style="width:1in;clear:both;" /><div>Exercise</div>',
						handler: function() {
							(function(view) {
								view.fireEvent("list_exercises", view);
							})(this.up("navigationview"))
						}
					},
					{
						text: "Log",
						xtype: "button",
						html: '<img src="/resources/icons/homescreen/log.png" style="width:1in;clear:both;" /><div>Log</div>',
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
						html: '<img src="/resources/icons/homescreen/settings.png" style="width:1in;clear:both;" /><div>Settings</div>',
						handler: function() {
							(function(view) {
								view.fireEvent("show_settings", view);
							})(this.up("navigationview"))
						}
					}
				]
			}
		]
	}
});