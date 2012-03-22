Ext.define("SiteSelector.controller.Body", {
	extend: "Ext.app.Controller",
	config: {
		refs: {
			addPump: 'BodyList button[action=add][type=pump]',
			addCgm: 'BodyList button[action=add][type=cgm]',
			formPanel: "BodyList",
			editSiteButton: "BodyList button[action=editsite]"
		},
		control: {
			addPump: {
				tap: 'addPump'
			},
			addCgm: {
				tap: "addCgm"
			},
			formPanel: {
				activate: "onActivate",
				editsite: "editSite"
			}
		}
	},
	views: ["SiteEdit"],
	addPump: function(button) {
		return this.addSite("pump", button.config.side, button.up("BodyList").down("image"))
	},
	addCgm: function(button) {
		return this.addSite("cgm", button.config.side, button.up("BodyList").down("image"))
	},
	addSite: function(type, side, view) {
		var expires = new Date(Date.now() + 10000);
		view.on("tap", function(el, event) {
			if (expires < Date.now()) return;
			var decay = 0;
			if (type == "pump") {
				decay = SiteSelector.app.settings.get("pumpreuse");
			} else {
				decay = SiteSelector.app.settings.get("cgmreuse");
			}
			console.log(event);
			var w = view.element.getWidth(),
			    h = view.element.getHeight(),
			    x = event.pageX - event.target.offsetParent.offsetParent.offsetLeft,
			    y = event.pageY - event.target.offsetParent.offsetTop,
			    store = view.up("panel").getStore();
			var usage = store.add({
		        kind: type,
				when: new Date(),
				x: x / w,
				y: y / h,
				side: side,
				decays: decay,
				location: new SiteSelector.model.BodyRegion().regionName(100 * x/w, 100 * y/h, side)
			});
			store.sync();
		}, this, { single: true });
	},
	onActivate: function(container) {
		container.clearSites();
		container.drawSites();
	},
	editSite: function(options) {
		this.overlay = Ext.Viewport.add({
			xtype: "SiteEdit",
			modal: true,
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
			height: Ext.Viewport.windowHeight * 0.8
		});
		this.overlay.show();
	}
});