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
	addPump: function(button) {
		return this.addSite("pump", button.config.side, button.up("BodyList").down("image"));
	},
	addCgm: function(button) {
		return this.addSite("cgm", button.config.side, button.up("BodyList").down("image"))
	},
	addSite: function(type, side, view) {
		var expires = new Date(Date.now() + 10000);
		view.on("tap", function(el, event) {
			if (expires < Date.now()) {
				var help = Ext.Viewport.add({
					xtype: "panel",
					html: "Oops, I didn't get that. Try again, but hold your finger where you'd like it placed (and don't worry about pressing the add button first.)",
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
				return;
			}
			var w = view.element.getWidth(),
			    h = view.element.getHeight(),
			    x = event.browserEvent.offsetX, // event.pageX - event.target.offsetParent.offsetParent.offsetLeft,
			    y = event.browserEvent.offsetY, //event.pageY - event.target.offsetParent.offsetTop,
			    store = view.up("panel").getStore();
			var usage = store.add({
		        kind: type,
				when: new Date(),
				x: x / w,
				y: y / h,
				side: side,
				location: new SiteSelector.model.BodyRegion().regionName(100 * x/w, 100 * y/h, side)
			});
			store.sync();
		}, this, { single: true });
	},
	onActivate: function(container) {
		window.setTimeout(function() {
			container.clearSites();
			container.drawSites();
		}, 2);
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