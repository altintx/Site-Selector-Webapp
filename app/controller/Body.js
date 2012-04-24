Ext.define("SiteSelector.controller.Body", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			formPanel: "BodyList"
		},
		control: {
			formPanel: {
				activate: "onActivate",
				editsite: "editSite",
				initialize: "onActivate"
			}
		}
	},
	onActivate: function(container) {
		window.setTimeout(function() {
			container.clearSites();
			container.drawSites();
		}, 200);
	},
	editSite: function(options) {
		var $this = this;
		this.overlay = Ext.Viewport.add({
			xtype: "SiteEdit",
			modal: true,
			hideOnMaskTap: true,
			record: options.record,
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
			centered: true,
			scrollable: true,
			width: Ext.Viewport.windowWidth * 0.8,
			height: Ext.Viewport.windowHeight * 0.8,
			listeners: {
				hide: function() {
					$this.overlay.destroy();
					delete $this.overlay;
				}
			}
		});
		this.overlay.show();
	}
});