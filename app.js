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
		"Reports",
		"Food"
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
		"Log",
		"Restaurant"
	],
	
	stores: [
		"Sites",
		"Settings",
		"Logs",
		"BloodSugars",
		"Nearby"
	],
	
	profiles: [
		"Phone",
		"Tablet"
	],
	firstLoad: true,
	
	settings: function() {
		this.settingsStore = Ext.data.StoreManager.get("Settings");
		var settings = this.settingsStore.first();
		if (this.firstLoad && (!settings || settings.data.version  < 2)) {
			var application = this;
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
					usezoom: Ext.os.is.phone? 1: 0,
					version: 2.0
				});
				settings = R[0];
			}
			var w_w = Ext.Viewport.windowWidth * 0.8, w_h = Ext.Viewport.windowHeight * 0.8;
			var msg = "Please tailor these parameters to your body.", title = "Getting Started"
			if (Ext.os.is.phone) {
				w_w = Ext.Viewport.windowWidth;
				w_h = Ext.Viewport.windowHeight;
			}
			switch (settings.data.version) {
				case null: 
				case 1.0:
				case 1.1:
					settings.set({
						pumplasts: 2,
						cgmlasts: 3,
						usezoom: Ext.os.is.phone? 1: 0,
						carb_ratio: 15,
						correction_factor: 50,
						target_bg: 100,
						usereminders: 1,
						version: 2.0
					});
					this.settingsStore.sync();
					Ext.data.StoreManager.get("Sites").backport_logs();
					Ext.data.StoreManager.get("Sites").recompute_locations();
					msg = "New settings to check out: Reminders, Zoom, Blood Sugars and Insulin Needs. If you use reminders it's important to set the Pump and/or CGM's <i>lasts</i> length (in days).";
					title = "Thanks for upgrading!";

					break;
				default:
					/* this version */
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
			application.firstLoad = false;
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
