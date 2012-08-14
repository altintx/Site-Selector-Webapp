Ext.define("SiteSelector.view.Body", {
	extend: "Ext.Img",
	alias: "widget.body",
	config: {
		style: "background-size:100% 100%;",
		layout: "fit",
		side: "front",
		resolution: 480,
		skin: "body",
		sites: []
	},
	
	constructor: function(config) {
		if (!("side" in config)) {
			config.side = "front";
		}
		
		if ("resolution" in config) {
			var availableResolutions = [1024, 2048];
			if (config.resolution == parseInt(config.resolution, 10)) {
				if (availableResolutions.indexOf(config.resolution) > -1) {
					config.resolution = availableResolutions[config.resolution];
				} else {
					throw new Error("Don't know what to do with provided resolution (" + config.resolution + ")");
				}
			} else if (config.resolution == "max") {
				config.resolution = availableResolutions[availableResolutions.length - 1];
			}
		} else {
			if (Ext.Viewport.windowHeight > 480) {
				config.resolution = 2048;
			} else {
				config.resolution = 1024;
			}
		}
		
		if (config.width || config.height) {
			delete config.layout;
		}
		
		config.src = config.side == "front"?
			("resources/images/body/" + config.resolution + "-front.png"): 
			("resources/images/body/" + config.resolution + "-back.png");
		
		this.callParent([config]);
	},
	
	initialize: function() {
		var $this = this;
		this.sites = [];
		
		var touches = {};
		this.element.on("tap", function(event, node, options, eOpts) {
			var T = touches[event.touch.identifier];
			delete touches[event.touch.identifier]
			if (T.is_long) return;
			
			$this.fireEvent("tap", T.x, T.y, node);
		});
		this.element.on("longpress", function(event) {
			touches[event.touch.identifier].is_long = true;

			$this.fireEvent("longtap", event, $this.element);
		});
		this.element.on("touchstart", function(event) {
			touches[event.touch.identifier] = {
				x: event.browserEvent.layerX,
				y: event.browserEvent.layerY,
				is_long: false
			};
		});
		this.element.on("swipe", function(e) { $this.onSwipe(e) })
	},
	
	drawSite: function(record, regenerate_time) {
		var time_left = (record.get("removed") == null)? regenerate_time:  (record.get("removed").getTime() + regenerate_time - Date.now());
		if (time_left > 0) { 
			this.sites.push(this.plotPoint(
				record.data.x,
				record.data.y,
				time_left / regenerate_time,
				record
			));
		}
	},
	
	plotPoint: function (x, y, opacity, record) {
		var img = this.element,
		    placeHolder = Ext.DomHelper.append(img, {
				tag: "div"
		    }, true),
		    $this = this;
		placeHolder.setStyle({
			position: "absolute"
		});
		placeHolder.setSize("0.25in", "0.25in");
		if (placeHolder.getWidth() > 0) {
			var site = new Ext.Button({
				cls: "circle " + record.get("kind"),
				baseCls: "site",
				style: {
					opacity: opacity
				},
				text: record.text(),
				renderTo: placeHolder,
				handler: function(button, event) {
					$this.fireEvent("editsite", {
						record: record,
						button: button
					});
					event.stopEvent();
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
	},
	
	clearSites: function() {
		this.sites.forEach(function(site) { site.destroy(); });
	},
	
	onSwipe: function(e) {
		var $this = this;
		if (this.config.resolution < 1024) {
			console.log("Shaded assets not available at low resolutions");
			return;
		};
		
		// // highlight body regions (for debugging)
		// var newCanvas = document.createElement('canvas');
		// newCanvas.height = this.getHeight();
		// newCanvas.width = this.getWidth();
		// this.element.dom.appendChild(newCanvas);
		// 
		// var ctx = newCanvas.getContext("2d");
		// var drawTriangle = function(t) {
		// 	ctx.beginPath();
		// 	ctx.moveTo(newCanvas.width * t.a[0] / 100, newCanvas.height * t.a[1] / 100);
		// 	ctx.lineTo(newCanvas.width * t.b[0] / 100, newCanvas.height * t.b[1] / 100);
		// 	ctx.lineTo(newCanvas.width * t.c[0] / 100, newCanvas.height * t.c[1] / 100);
		// 	ctx.fillStyle = "#ff9999";
		// 	ctx.strokeStyle = "#000000";
		// 	ctx.fill();
		// }
		// new SiteSelector.model.BodyRegion().regions("back").forEach(function(r) {
		// 	r.container.forEach(function(t) {
		// 		drawTriangle(t);
		// 	})
		// 	
		// });
		// return;
		
		
		var toggler = function() {
			if ($this.config.skin == "body") {
				$this.config.skin = "body-shaded-ambiguous";
			} else {
				$this.config.skin = "body";
			}
			$this.setSrc("resources/images/" + $this.config.skin + "/" + $this.config.resolution + "-" + $this.config.side + ".png");
		};
		if (SiteSelector.app.settings().get("infusion_sites_consent")) {
			toggler();
		} else {
			Ext.Msg.show({
				title: "Consult your doctor",
				message: "Site Selector will now highlight areas commonly used for infusion sites. This doesn't mean you should use them, not does it mean they will work for you. Consult your doctor.",
				buttons: [{
					text: "Highlight Common Sites",
					itemId: "ok"
				},
				{
					text: "Don't Highlight",
					itemId: "cancel"
				}],
				fn: function(buttonId) {
					if (buttonId == "cancel") return;
					
					var s = SiteSelector.app.settings();
					s.set("infusion_sites_consent", Date.now());
					Ext.data.StoreManager.get("Settings").sync();
					toggler();
				}
			})
		}
	}
})