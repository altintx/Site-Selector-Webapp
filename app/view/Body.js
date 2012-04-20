Ext.define("SiteSelector.view.Body", {
	extend: "Ext.Img",
	alias: "widget.body",
	config: {
		style: "background-size:100% 100%;",
		layout: "fit"
	},
	
	constructor: function(config) {
		if (!("side" in config)) {
			config.side = "front";
		}
		
		if ("resolution" in config) {
			if (config.resolution == parseInt(config.resolution)) {
				var availableResolutions = [480, "1k", "4k"];
				if (availableResolutions[config.resolution]) {
					config.resolution = availableResolutions[config.resolution];
				} else {
					throw new Error("Don't know what to do with provided resolution (" + config.resolution + ")");
				}
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
	}
})