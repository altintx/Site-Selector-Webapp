Ext.define("SiteSelector.view.Body", {
	extend: "Ext.Img",
	alias: "widget.body",
	config: {
		style: "background-size:100% 100%;",
		layout: "fit",
		side: "front",
		alias: "front",
		sites: []
	},
	
	constructor: function(config) {
		if (!("alias" in config)) {
			config.alias = "front";
		}

		if (!("side" in config)) {
			config.side = config.alias;
		}
		
		
		if ("resolution" in config) {
			var availableResolutions = [480, "1k", "4k"];
			if (config.resolution == parseInt(config.resolution)) {
				if (availableResolutions[config.resolution]) {
					config.resolution = availableResolutions[config.resolution];
				} else {
					throw new Error("Don't know what to do with provided resolution (" + config.resolution + ")");
				}
			} else if (config.resolution = "max") {
				config.resolution = availableResolutions[availableResolutions.length - 1];
			}
		} else {
			config.resolution = 480;
		
			if (Ext.Viewport.windowHeight > 1024) {
				config.resolution = "4k";
			} else if (Ext.Viewport.windowHeight > 480) {
				config.resolution = "1k";
			}
		}
		
		if (config.width || config.height) {
			delete config.layout;
		}
		
		config.src = config.side == "front"?
			("resources/images/body/" + config.resolution + "/front.png"): 
			("resources/images/body/" + config.resolution + "/back.png");
		
		return this.callParent([config]);
	},
	
	initialize: function() {
		var $this = this;
		this.sites = [];
		this.element.on("tap", function(event, node, options, eOpts) {
			if (!$this.long_tap)
				$this.fireEvent("tap", event, node, options, eOpts);
		});
		
		this.element.on("longpress", function(event) {
			$this.long_tap = true;
			$this.fireEvent("longtap", event, $this.element);
			setTimeout(function() {
				delete $this.long_tap;
			}, 1000);
		});

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
		placeHolder.setSize("0.25in", "0.25in");;
		if (placeHolder.getWidth() > 0) {
			var site = new Ext.Button({
				cls: "circle " + record.get("kind"),
				baseCls: "site",
				style: {
					opacity: opacity
				},
				text: "+",
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
	}
})