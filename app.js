//<debug>
Ext.Loader.setPath({
	'Ext': 'sdk/src'
});
//</debug>

Ext.application({
	name: 'SiteSelector',

	requires: [
		'Ext.MessageBox',
		'Ext.device.*'
	],
	
	controllers: [
		"Settings",
		"Body",
		"Log",
		"BloodSugar",
		"Reports"
	],
	
	views: [
		"LogActionSheet",
		"BodyList",
		"LogViewer",
		"Settings",
		"SiteEdit"
	],
	
	models: [
		"Site",
		"Setting",
		"BodyRegion",
		"Log"
	],
	
	stores: [
		"Sites",
		"Settings",
		"Logs",
		"BloodSugars"
	],
	
	profiles: [
		"Phone",
		"Tablet"
	],
	firstLoad: true,
	
	settings: function() {
		this.settingsStore = Ext.data.StoreManager.get("Settings");
		var settings = this.settingsStore.first();
		if (!settings || [settings.data.pumplasts, settings.data.cgmlasts, settings.data.usezoom, settings.data.carb_ratio, settings.data.correction_factor,settings.data.target_bg].indexOf(null) > -1) {
			if (!settings) {
				var R = this.settingsStore.add({
					usecgms: 1,
					usepump: 1,
					pumpreuse: 28,
					cgmreuse: 14,
					pumplasts: 2,
					cgmlasts: 3,
					carb_ratio: 15,
					correction_factor: 50,
					target_bg: 100,
					usereminders: 1,
					usezoom: Ext.os.is.phone? 1: 0
				});
				settings = R[0];
			}
			var w_w = Ext.Viewport.windowWidth * 0.8, w_h = Ext.Viewport.windowHeight * 0.8;
			var msg = "Please tailor these parameters to your body.", title = "Getting Started"
			if (Ext.os.is.phone) {
				w_w = Ext.Viewport.windowWidth;
				w_h = Ext.Viewport.windowHeight;
			} else {
				if (!settings.data.pumplasts) {
					settings.data.pumplasts = 2;
				}
				if (!settings.data.cgmlasts) {
					settings.data.cgmlasts = 3;
				}
				if (!settings.data.usezoom) {
					settings.data.usezoom = Ext.os.is.phone? 1: 0;
				}
				if (!settings.data.carb_ratio) {
					settings.data.carb_ratio = 15;
				}
				if (!settings.data.correction_factor) {
					settings.data.correction_factor = 50;
				}
				if (!settings.data.target_bg) {
					settings.data.target_bg = 100;
				}
				if (!settings.data.usereminders) {
					settings.data.usereminders = 0;
				}
				
				msg = "New settings to check out: Reminders, Zoom, Blood Sugars and Insulin Needs. If you use reminders it's important to set the Pump and/or CGM's <i>lasts</i> length (in days).";
				title = "Thanks for upgrading!";
			}
			var settingsView = Ext.Viewport.add({
				modal: true,
				record: settings,
				centered: true,
				scrollable: true,
				width: w_w,
				height: w_h,
				showAnimation: {
					type: "popIn",
					duration: 250,
					easing: "ease-out"
				},
				hideAnimation: {
					type: "popOut",
					duration: 250,
					easing: "ease-out"
				},

				xtype: "Settings",
				listeners: {
					initialize: function() {
						window.setTimeout(function() {
							Ext.Msg.alert(
								title,
								msg
							);
						}, 1);
					},
					saved: function() {
						settingsView.destroy();
					}
				}
			});
			settingsView.show();
		}
		return settings;
	},
	
	showHelp: false,
	
	icon: {
		57: 'resources/icons/Icon.png',
		72: 'resources/icons/Icon~ipad.png',
		114: 'resources/icons/Icon@2x.png',
		144: 'resources/icons/Icon~ipad@2x.png'
	},

	phoneStartupScreen: 'resources/loading/Homescreen.jpg',
	tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

	launch: function() {
		// Destroy the #appLoadingIndicator element
		Ext.fly('appLoadingIndicator').destroy();
		
		var stub = this.settings();
	},

	onUpdated: function() {
		Ext.Msg.confirm(
			"Application Update",
			"This application has just successfully been updated to the latest version. Reload now?",
			function() {
				window.location.reload();
			}
		);
	},
	onRender: function() {
		if (this.firstLoad){        
			Ext.repaint();
			this.firstLoad=false;
			// alert("here");
			window.scrollTo(0,0);
		}
	}
});
