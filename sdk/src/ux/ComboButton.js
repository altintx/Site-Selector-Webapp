Ext.define("Ext.ux.ComboButton", {
	extend: "Ext.Button",
	alias: "widget.combobutton",
	
	initialize: function() {
		var $this = this;
		var touches = {};

		this.element.on("tap", function(event, node, options, eOpts) {
			var T = touches[event.touch.identifier];
			delete touches[event.touch.identifier]
			
			if (T.is_long) return;
			
			$this.fireEvent("tap", event, node);
		});

		this.element.on("longpress", function(event) {
			touches[event.touch.identifier].is_long = true;

			$this.fireEvent("longtap", event, $this.element);
		});
		
		this.element.on("touchend", function() {
			$this.removeCls("x-button-pressing");
		})

		this.element.on("touchstart", function(event) {
			touches[event.touch.identifier] = {
				x: event.browserEvent.layerX,
				y: event.browserEvent.layerY,
				is_long: false
			};
			$this.addCls("x-button-pressing");
		});
	}
});