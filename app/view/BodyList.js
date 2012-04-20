Ext.define("SiteSelector.view.BodyList", {
    extend: 'Ext.Container',
	alias: "widget.BodyList",
	requires: ["Ext.Img", "Ext.ActionSheet", "Ext.field.Slider", "SiteSelector.view.Body"],
	stores: ['Sites'],
	
    config: {
		iconCls: "user",
		layout: "fit",
		store: null,
		sites: [],
		alias: "",
		bodyConfig: null,
		_sliders: []
	},
	
	constructor: function(config) {
		this.store = config.store;
		this.sites = [];
		this.alias = config.alias;
		this._sliders = [];
		
		config.items = [
			{
				xtype: "titlebar",
				docked: "top",
				title: config.title,
				items: [
					{
						text: "History",
						align: "left",
						handler: function() {
							var container = this.up("BodyList").down("container[alias=vbox]");
							container.getScrollable().getScroller().scrollTo(0,0);
							var help = Ext.Viewport.add({
								xtype: "panel",
								html: "Swipe up to dismiss. You can also swipe down to reveal this panel.",
								overlay: true,
								top: "1in",
								hideOnMaskTap: true,
							});
							help.showBy(container.down("sliderfield"));
							// expire help after 5s
							Ext.Anim.run(help, 'fade', {
								after: function() {
									help.destroy();
								},
								out: true,
								delay: 5000
							})
							
						}
					},
					{
						text: "Add Site",
						align: "right",
						handler: function() {
							var help = Ext.Viewport.add({
								xtype: "panel",
								html: "Hold your finger on the body image to indicate where you've placed your site.",
								overlay: true,
								top: "1in",
								hideOnMaskTap: true,
							});
							help.showBy(this);
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
				]
			},
			{
				xtype: "body"
			}
		];
		
		this.callParent(arguments);
		
		this.drawSites = this.drawSitesDefault;
	},
	
	
	initialize: function() {
		var $this = this;
		var humanBodyMap = $this.down("img");
		
		var fn = function(store, records, index) {
			if ($this.bodyElement) {
				records.filter(function(r) { return r.data.side == $this.alias; }).forEach(function(r) { 
					if ($this.drawSites == $this.drawSitesDefault)
						$this.drawSite(r, r.decays()); 
					else
						$this.drawSite(r, $this.down("sliderfield").getValue() * 86400000)
				});
			} else {
				$this.getStore().un("addrecords", fn);
				// through rotating display we can hold a reference to a BodyList that ceases to exist
				// so we remove the listener on it if we can detect that happened
			}
		};
		// needs assigned this way so we can unregister on just this instance
		$this.getStore().on("addrecords", fn);
		
		var fnTimer = function() {
			var fnSlider = function() {
				var c = Ext.ComponentQuery.query("slider");
				var slider = null;
				if (c == null) return setTimeout(fnSlider, 50);
				while (c.length > 0) {
					slider = c.shift();
					if (!$this._sliders.indexOf(slider) > -1) {
						slider.on("drag", $this.onTimeFilterChange());
						$this._sliders.push(slider);
					}
				}
			}
			if (humanBodyMap.element != null && humanBodyMap.element.getHeight() > 0) {
				var w = humanBodyMap.element.getWidth(), h = humanBodyMap.element.getHeight();
				humanBodyMap.destroy();
				$this.add({
					xtype: "container",
					layout: "vbox",
					alias: "vbox",
					scrollable: {
						direction: "vertical",
						initialOffset: {
							y: 100 // scrolled to bottom
						}
					},
					items: [
						{
							xtype: "sliderfield",
							label: "Time Period",
							value: 0,
							minValue: 0,
							maxValue: 90,
						},
						{
							xtype: "body",
							width: w,
							height: h + 1
						}
					]
				}).show();

				$this.down("body").element.on("longpress", $this.onLongPress());
				fnSlider();
			} else {
				setTimeout(fnTimer, 50);
			}
		}
		fnTimer();
	},
	
	onLongPress: function() {
		var $this = this;
		return function(event, target) {
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
					'background-image': '-webkit-linear-gradient(bottom, #8f0508 52%, #c51e0f 76%)'
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
						handler: $this.actionMenuClick(event)
					},
					{
						xtype: "button",
						text: "CGM",
						handler: $this.actionMenuClick(event)
					},
					{
						xtype: "button",
						text: "Cancel",
						ui: "decline",
						handler: $this.actionMenuClick(event)
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
		}
	},
	
	actionMenuClick: function(event) {
		var $this = this;
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
	
	dayInMS: function() {
		return 1000 * 60 * 60 * 24;
	},

	drawSitesDefault: function() {
		var $this = this;

		$this.getStore().each(function(record) {
			if (record.data.side == $this.alias) {
				try { $this.drawSite(record, record.decays() * $this.dayInMS())
				
				} 
				catch (e) { /* incomplete record */	}
			}
		});
	},
	
	onTimeFilterChange: function() {
		var $this = this;
		var scheduled_anim = null;
		var help = null;
		return function(slider, thumb) {
			var value = slider.getValue(), msg = "";
			if (help) {
				help.destroy();
			}

			if (value > 0) {
				$this.drawSites = $this.drawSitesPeriod;
				msg = "Viewing all sites within the last " + value + " " + (value > 1? "days": "day");
			} else {
				$this.drawSites = $this.drawSitesDefault;
				msg = "Viewing all unhealed sites";
			}

			help = Ext.Viewport.add({
				xtype: "panel",
				html: msg,
				style: 'opacity: 0.6;margin: 1em;',
				overlay: true,
				top: "1in",
				hideOnMaskTap: true,
			});
			
			$this.clearSites();
			$this.drawSites(value);
			
			scheduled_anim = Date.now() + 5000;
			
			var close_help = function() {
				if (Date.now() > scheduled_anim) {
					Ext.Anim.run(help, 'fade', {
						after: function() {
							help.destroy();
						},
						out: true
					})
				} else {
					setTimeout (close_help, Math.max(scheduled_anim - Date.now(), 250));
				}
			}
			setTimeout(close_help, 5000)
		};
	},
	
	drawSitesPeriod: function(daysBack) {
		var $this = this;

		$this.getStore().each(function(record) {
			if (record.data.side == $this.alias) {
				try {
					$this.drawSite(record, $this.dayInMS() * daysBack);
				} 
				catch (e) { /* incomplete record */	}
			}
		});
	},
	
	drawSite: function(record, regenerate_time) {
		var $this = this;
		var time_left = (record.get("removed") == null)? regenerate_time:  (record.get("removed").getTime() + regenerate_time - Date.now());
		if (time_left > 0) { 
			$this.sites.push(this.plotPoint(
				record.data.x,
				record.data.y,
				time_left / regenerate_time,
				(record.data.kind == "pump"? 
					'-webkit-linear-gradient(bottom, #4A094A 52%, #8C4FA6 76%)':
					'-webkit-linear-gradient(top, #D18023 52%, #8F4411 76%)'
				),
				record
			));
		}
	},

	clearSites: function() {
		this.sites.forEach(function(site) { site.destroy(); });
	},
	
	getStore: function () {
		return this.store;
	},
	
	plotPoint: function (x, y, opacity, gradient, record) {
		var img = this.down("img").element,
		    placeHolder = Ext.DomHelper.append(img.parent(), {
		    	tag: "div"
		    }, true),
		    $this = this;
		placeHolder.setStyle({
			position: "absolute"
		});
		placeHolder.setSize("0.25in", "0.25in");;
		if (placeHolder.getWidth() > 0) {
			var site = new Ext.Button({
				cls: "circle",
				baseCls: "site",
				style: {
					opacity: opacity,
					'background-image': gradient
				},
				text: "+",
				renderTo: placeHolder,
				handler: function(button) {
					$this.fireEvent("editsite", {
						record: record,
						button: button
					});
				}
			});
			site.show();
			var s = placeHolder.getWidth() / 2;
			placeHolder.setXY([
				img.getX() + img.getWidth() * x - s, 
				img.getY() + img.getHeight() * y - s
			]);
		}
		return placeHolder;
	}
});