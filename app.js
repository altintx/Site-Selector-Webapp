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
		"Body"
	],
	
	views: [
		'SiteEdit'
	],
	
	models: [
		"Site",
		"Setting",
		"BodyRegion"
	],
	
	stores: [
		"Sites",
		"Settings"
	],
	
	profiles: [
		"Phone",
		"Tablet"
	],
	
	settings: function() {
		this.settingsStore = Ext.data.StoreManager.get("Settings");
		var settings = this.settingsStore.first();
		if (!settings) {
			// this.showHelp = true;
			var R = this.settingsStore.add({
				usecgms: 1,
				usepump: 1,
				pumpreuse: 28,
				cgmreuse: 14
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
							"To get started, please indicate how quickly you heal.",
							function() {
								// settingsView.setRecord(this.settings);
							}
						);
						}, 1);
					},
					saved: function() {
						settingsView.destroy();
						// if we don't need to show help, unbind this
						var help = Ext.Viewport.add({
							xtype: "panel",
							html: "Tap the type of site you'd like to add, then tap the body location you'd like to place it at.",
							style: 'opacity: 0.6;margin: 1em;',
							overlay: true,
							top: "1in",
							hideOnMaskTap: true,
						});
						// expire help after 5s
						Ext.Anim.run(help, 'fade', {
							after: function() {
								help.destroy();
							},
							out: true,
							delay: 5000
						})
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
	}
});
