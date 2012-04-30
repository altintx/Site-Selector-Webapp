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
				zoom: "zoom"
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
		
		var humanBodyMap = $this.down? $this.down("img"): $this;
		return function() {
			switch (this.getText()) {
				case "Pump":
				case "CGM":
					var w = humanBodyMap.element.getWidth(),
					    h = humanBodyMap.element.getHeight(),
					    x = event.browserEvent.layerX,
					    y = event.browserEvent.layerY,
					    store = Ext.data.StoreManager.get("Sites"),
					    kind = (this.getText() == "Pump"? "pump": "cgm");
					var lastSite = store.lastSite($this.config.alias, kind);
					var usage = store.add({
						kind: kind,
						when: new Date(),
						x: x / w,
						y: y / h,
						side: $this.config.alias,
						removed: null,
						location: new SiteSelector.model.BodyRegion().regionName(100 * x/w, 100 * y/h, $this.config.alias)
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
	
	zoom: function(x, y, body) {
		var m_w = body.element.getWidth(),
		    m_h = body.element.getHeight(),
		    m_x = x / m_w * 100,
		    m_y = y / m_h * 100,
			$this = this;
		
		if (!SiteSelector.app.settings().get("usezoom")) return;
		
		var x1 = m_x - 10,
			x2 = m_x + 10,
			y1 = m_y - 10,
			y2 = m_y + 10;
		
		if (x1 < 0) {
			x2 = x2 - x1;
			x1 = 0;
		}
		if (x2 > 100) {
			x1 = x1 - (x2 - 100);
			x2 = 100;
		}
		if (y1 < 0) {
			y2 = y2 - y1;
			y1 = 0;
		}
		if (y2 > 100) {
			y1 = y1 - (y2 - 100);
			y2 = 100;
		}
		
		var zoom = Ext.create('Ext.Panel', {
			items: [
				{
					xtype: "titlebar",
					title: "Zoomed Placement",
					docked: "top"
				},
				{
					xtype: "container",
					style: {
						overflow: "hidden",
						position: "relative",
						"background-color": "#301111"
					},
					items: [
						{
							xtype: "body",
							alias: body.alias,
							top: (-y1 * 5) + "%",
							left: (-x1 * 5) + "%",
							width: "500%",
							height: "500%",
							resolution: "max",
							listeners: {
								initialize: function() {
									var body = this;
									setTimeout(function() {
										Ext.data.StoreManager.get("Sites").each(function(record) {
											if (record.data.side == body.config.alias) {
												try {
													body.drawSite(record, record.decays());
												} 
												catch (e) { /* incomplete record */	}
											}
										});
									}, 500)
								},
								longtap: function(event) {
									var target = this.element, body = this;

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
												handler: $this.actionMenuClick(event, body)
											},
											{
												xtype: "button",
												text: "CGM",
												handler: $this.actionMenuClick(event, body)
											},
											{
												xtype: "button",
												text: "Cancel",
												ui: "decline",
												handler: $this.actionMenuClick(event, body)
											}
										],
										listeners: {
											hide: function() {
												site.destroy();
												placeHolder.destroy();
												$this.actions.destroy();
												body.up("panel").destroy();
											}
										}
									});
									$this.actions.show();
								}
							}
						}
					]
				}
			],
			layout: "fit",
			overlay: true,
			hideOnMaskTap: true,
			centered: true,
			modal: true,
			width: "80%",
			height: "90%"
		});
		Ext.Viewport.add(zoom);
	}
});