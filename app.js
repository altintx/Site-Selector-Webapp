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
		"Food",
		"Insulin",
		"Exercises"
	],
	
	views: [
		"BodyList",
		"LogViewer",
		"Settings",
		"SiteEdit",
		"Homescreen",
		"Viewport",
	],
	
	models: [
		"Site",
		"Setting",
		"BodyRegion",
		"Log",
		"Restaurant",
		"Exercise",
		"Bolus"
	],
	
	stores: [
		"Sites",
		"Settings",
		"Logs",
		"BloodSugars",
		"Nearby",
		"Meals",
		"Medications",
		"Exercises"
	],
	
	profiles: [
		"Phone",
		"Tablet"
	],
	firstLoad: true,
	
	bgStep: 1,
	
	settings: function(property) {
		this.settingsStore = Ext.data.StoreManager.get("Settings");
		var settings = this.settingsStore.first();
		if (this.firstLoad && (!settings || settings.data.version  < 2.2)) {
			var application = this;
			if (!settings) {
				var R = this.settingsStore.add({
					usecgms: 1,
					usepump: 1,
					pumpreuse: 28,
					cgmreuse: 14,
					bolusreuse: 48,
					basalreuse: 48,
					pumplasts: 2,
					cgmlasts: 3,
					basallasts: 24,
					carb_ratio: 15,
					correction_factor: 50,
					target_bg: 100,
					usereminders: 1,
					usezoom: Ext.os.is.phone? 1: 0,
					version: 2.2,
					bgunits: "mgdl"
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
					Ext.data.StoreManager.get("Sites").backport_logs();
					Ext.data.StoreManager.get("Sites").recompute_locations();
				case 2.0:
					settings.set({
						version: 2.1
					});
				case 2.1:
					settings.set({
						bolusreuse: 48,
						basalreuse: 48,
						basallasts: 24,
						bgunits: "mgdl",
						version: 2.2
					});
					(function(bgstore) {
						bgstore.each(function(r) {
							r.set("unit", "mgdl");
						});
						bgstore.sync();
					})(Ext.data.StoreManager.get("BloodSugars"))
					
					this.settingsStore.sync();
					msg = "Shot tracking is now available. Configure your healing time for each of basal and bolus. Also, blood sugar units can now be set to mmol/L";
					title = "Thanks for upgrading!";				
				default:
					/* this version */
			}
			// message box call is inside of the initialize() callback below
			setTimeout(function() {
				var settingsView = Ext.Viewport.down("navigationview").push({
					record: settings,
					scrollable: true,
					xtype: "Settings",
					listeners: {
						initialize: function() {
							window.setTimeout(function() {
								Ext.Msg.alert(
									title,
									msg
								);
							}, 100);
						},
						saved: function() {
							settingsView.destroy();
						}
					}
				});
			}, 250);
		}
		
		if (this.firstLoad) {
			settings.updateUserBloodSugarUnits();
			this.firstLoad = false;
		}
		
		if (property) {
			return settings.get(property);
		} else {
			return settings;
		}
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
		
		setTimeout(function() {
			Ext.data.StoreManager.get("BloodSugars").load();
			Ext.data.StoreManager.get("Logs").load();
			Ext.data.StoreManager.get("Meals").load();
			Ext.data.StoreManager.get("Medications").load();
		}, 100);
		
		Ext.Viewport.add({
			xtype: "siteselectorviewport"
		})
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
