Ext.define("SiteSelector.controller.Log", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			Log: {
				itemtap: 'log_onItemTap'
			}
		},
		refs: {
			'Log': 'LogViewer'
		}
	},
	
	log_onItemTap: function(list, ix, target, logrecord) {
		var record = logrecord.getOwner();
		var overlay;
		switch (logrecord.get("model")) {
			case "SiteSelector.model.Site":
				overlay = Ext.Viewport.add({
					xtype: "SiteEdit",
					modal: true,
					hideOnMaskTap: true,
					record: record,
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
							overlay.destroy();
						}
					}
				});
				break;
			default:
				alert("I don't know what to do with " + logrecord.get("model"));
				return;
		}
		overlay.show();
	}
})