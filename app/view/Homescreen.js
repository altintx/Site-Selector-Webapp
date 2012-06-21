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
				docked: "top",
				scrollable: false
			},
			{
				xtype: "container",
				layout: "hbox",
				flex: 1,
				items: [
					{
						text: "Insulin",
						xtype: "button",
						ui: "icon",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/vial.png" /><div>Insulin</div>').replace(/\/\//g, '/'),
						flex: 1,
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
							(function(view) {
								view.fireEvent("bolus", view);
							})(this.up("navigationview"))
						}
					},
					{
						text: "Eat",
						flex: 1,
						ui: "icon",
						xtype: "button",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/eat.png" /><div>Eat</div>').replace(/\/\//g, '/'),
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
							(function(view) {
								view.fireEvent("eat", view);
							})(this.up("navigationview"))
						}
					},
					{
						xtype: "button",
						text: "Sites",
						flex: 1,
						ui: "icon",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/sites.png" /><div>Sites</div>').replace(/\/\//g, '/'),
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
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
						ui: "icon",
						xtype: "button",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/exercise.png" /><div>Exercise</div>').replace(/\/\//g, '/'),
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
							(function(view) {
								view.fireEvent("list_exercises", view);
							})(this.up("navigationview"))
						}
					},
					{
						text: "Log",
						xtype: "button",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/log.png" /><div>Log</div>').replace(/\/\//g, '/'),
						flex: 1,
						ui: "icon",
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
							(function(view) {
								view.fireEvent("showlog", view);
							})(this.up("navigationview"))
						}
					},
					{
						text: "Settings",
						xtype: "button",
						flex: 1,
						ui: "icon",
						html: ('<img src="' + window.location.pathname.replace("index.html", "") + '/resources/icons/homescreen/settings.png" /><div>Settings</div>').replace(/\/\//g, '/'),
						handler: function() {
							if (this.up("homescreen").screens > 0) return;
							(function(view) {
								view.fireEvent("show_settings", view);
							})(this.up("navigationview"))
						}
					}
				]
			}
		]
	},
	
	constructor: function() {
		var $this = this;
		this.callParent(arguments);
		this.on("painted", function($this) {
			$this.screens = 0;
			this.up("navigationview").on("push", function(nv, item) {
				$this.screens++;
			})
			this.up("navigationview").on("pop", function(nv, item) {
				$this.screens--;
			})
		})
	}
});