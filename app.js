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
		'SiteEdit',
		"LogActionSheet"
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
		if (!settings) {
			var R = this.settingsStore.add({
				usecgms: 1,
				usepump: 1,
				pumpreuse: 28,
				cgmreuse: 14,
				pumplasts: 2,
				cgmlasts: 3
			});
			settings = R[0];
			var settingsView = Ext.Viewport.add({
				modal: true,
				record: settings,
				centered: true,
				scrollable: true,
				width: Ext.Viewport.windowWidth * 0.8,
				height: Ext.Viewport.windowHeight * 0.8,
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
								"Configure",
								"To get started, please indicate how quickly you heal."
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
