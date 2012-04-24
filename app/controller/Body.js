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
				initialize: "onActivate",
				longtap: "addSite",
				tap: "zoom"
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
	},
	
	addSite: function(event, target, body) {
		var $this = body;
		
		var placeHolder = Ext.DomHelper.append(target, {
			tag: "div"
		}, true);
		placeHolder.setStyle({
			position: "absolute"
		});
		var site = new Ext.Button({
			cls: "circle",
			baseCls: "site",
			style: {
				opacity: 1,
			},
			text: "+",
			renderTo: placeHolder
		});
		placeHolder.setSize("0.25in", "0.25in");;
		placeHolder.setXY(event.pageX - placeHolder.getWidth() / 2, event.pageY - placeHolder.getHeight() / 2)
		site.show();

		$this.actions = Ext.Viewport.add({
			xtype: "actionsheet",
			items: [
				{
					xtype: "button",
					text: "Pump",
					handler: this.actionMenuClick(event, body)
				},
				{
					xtype: "button",
					text: "CGM",
					handler: this.actionMenuClick(event, body)
				},
				{
					xtype: "button",
					text: "Cancel",
					ui: "decline",
					handler: this.actionMenuClick(event, body)
				}
			],
			listeners: {
				hide: function() {
					site.destroy();
					placeHolder.destroy();
					$this.actions.destroy();
				}
			}
		});
		$this.actions.show();
	},
	
	actionMenuClick: function(event, body) {
		var $this = body;
		
		var humanBodyMap = $this.down("img");
		return function() {
			switch (this.getText()) {
				case "Pump":
				case "CGM":
					var w = humanBodyMap.element.getWidth(),
					    h = humanBodyMap.element.getHeight(),
					    x = event.browserEvent.layerX,
					    y = event.browserEvent.layerY,
					    store = $this.getStore(),
					    kind = (this.getText() == "Pump"? "pump": "cgm");
					var lastSite = store.lastSite($this.alias, kind);
					var usage = store.add({
				        kind: kind,
						when: new Date(),
						x: x / w,
						y: y / h,
						side: $this.alias,
						removed: null,
						location: new SiteSelector.model.BodyRegion().regionName(100 * x/w, 100 * y/h, $this.alias)
					});
					if (lastSite) {
						Ext.Msg.confirm("Remove old site", "Would you like to mark the site you inserted " + lastSite.get("when").toLocaleDateString() + " as removed?", function(button) {
							if (button == "yes") {
								lastSite.set("removed", new Date());
								lastSite.dirty = true;
							}
							store.sync();
							
						});
					} else {
						store.sync();
					}
			}
			this.up("actionsheet").hide();
		}
	},
	
	zoom: function(event, body) {
		alert("I'm zooming!");
	}
});