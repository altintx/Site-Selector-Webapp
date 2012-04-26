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
							});
							container.getScrollable().getScroller().on("scroll", function(event) {
								help.destroy();
							}, true);
						}
					},
					{
						text: "Add Site",
						align: "right",
						handler: function() {
							var help = Ext.Viewport.add({
								xtype: "panel",
								html: "Temporarily hiding existing sites. Long-tap to place a site, or short-tap to zoom first.",
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
							var bl = this.up("BodyList");
							bl.clearSites();
							var t = setTimeout(function() {
								bl.drawSites();
							}, 5000);
							bl.down("body").on("tap", function() {
								bl.drawSites();
								clearTimeout(t);
							})
						}
					}
				]
			},
			{
				xtype: "body",
				alias: config.alias
			}
		];
		
		this.callParent(arguments);
		
		this.drawSites = this.drawSitesDefault;
	},
	
	
	initialize: function() {
		var $this = this;
		var humanBodyMap = $this.down("body");
		
		var fn = function(store, records, index) {
			humanBodyMap = $this.down("body");
			if (humanBodyMap.element) {
				records.filter(function(r) { return r.data.side == $this.alias; }).forEach(function(r) { 
					if ($this.drawSites == $this.drawSitesDefault)
						humanBodyMap.drawSite(r, r.decays()); 
					else
						humanBodyMap.drawSite(r, $this.down("sliderfield").getValue() * 86400000)
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
							height: h + 1,
							alias: $this.alias,
							listeners: {
								tap: function(x, y, node) {
									if (!$this.long_tap_active) {
										$this.fireEvent("zoom", x, y, $this);
									}
								},
								editsite: function(params) {
									$this.fireEvent("editsite", params);
								},
								longtap: function(event, target) {
									$this.fireEvent("longtap", event, target, $this);
								}
							}
						}
					]
				}).show();

				fnSlider();
			} else {
				setTimeout(fnTimer, 50);
			}
		}
		fnTimer();
	},
	
	drawSitesDefault: function() {
		var $this = this;
		var body = $this.down("body");
		
		$this.getStore().each(function(record) {
			if (record.data.side == $this.alias) {
				try {
					body.drawSite(record, record.decays());
				} 
				catch (e) { /* incomplete record */	}
			}
		});
	},
	
	onTimeFilterChange: function() {
		var $this = this,
		    scheduled_anim = null;
		    help = null,
		    body = this.down("body");
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
			$this.drawSites(value * 1000 * 60 * 60 * 24);
			
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
		var body = $this.down("body");

		$this.getStore().each(function(record) {
			if (record.data.side == $this.alias) {
				try {
					body.drawSite(record, daysBack);
				} 
				catch (e) { /* incomplete record */	}
			}
		});
	},
	
	clearSites: function() {
		this.down("body").clearSites();
	},
	
});