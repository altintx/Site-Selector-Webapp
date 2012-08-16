//<debug>
Ext.Loader.setPath({
	'Ext': 'sdk/src'
});
//</debug>

Array.prototype.unique = function() {	
	var o = {}, i, l = this.length, r = [];	
	for(i=0; i<l;i+=1) 
		o[this[i]] = this[i];	
	for(i in o) 
		r.push(o[i]);	
	return r;
};


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
	
	// getBloodSugarInUserUnits: true, // see model.Setting
	// getUserBgInMgDl: true, // see model.Setting
	bgStep: 1,
	
	settings: function(key) {
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
					version: 4.0,
					bgunits: "mgdl",
					quietFrom: new Date(2000, 0, 1, 22, 0, 0),
					quietTo: new Date(2000, 01, 1, 7, 0, 0)
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
				case 2.2:
				case 3.0:
					settings.set({
						version: 4.0,
						quiet_from: new Date(2000, 0, 1, 22, 0, 0),
						quiet_to: new Date(2000, 01, 1, 7, 0, 0)
					});
					msg = "Reminders now have a quiet period and will remind you a few hours earlier that it's almost time to change sites.";
					title = "Thanks for upgrading!";				
				default:
					/* this version */
			}
			// message box call is inside of the initialize() callback below
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
		if (this.firstLoad) {
			settings.updateUserBloodSugarUnits();
			this.firstLoad = false;
		}
		
		if (key) {
			return settings.get(key);
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
