Ext.define("SiteSelector.ux.BloodSugarSlider", {
	extend: "Ext.Container",
	alias: "widget.bloodsugar",
	config: {
		layout: "hbox",
		items: [ ]
	},
	constructor: function(config) {
		var $this = this;
		
		var field = config.name, label = config.label;
		delete config.field;
		delete config.label;
		
		var increment = SiteSelector.app.bgStep, min = 0, max;
		var unit = SiteSelector.app.settings("bgunits");
		
		var subordinate = ("subordinateTo" in config)? 
			config.subordinateTo: 
			false;
			
		delete config.subordinateTo;
		
		if (unit == "mgdl") {
			max = 1000;
		} else {
			max = 56;
		}
		config.items = [
			{
				xtype: "togglefield",
				name: "use_" + field,
				label: false,
				flex: 1,
				ui: "small"
			},
			{
				xtype: "spinnerfield",
				name: field,
				label: label,
				labelCls: "transparent_label",
				labelWidth: "40%",
				minValue: min,
				maxValue: max,
				increment: increment,
				cycle: false,
				flex: 3,
				listeners: {
					spin: function(slider, value, oldvalue) {
						$this.down("togglefield").setValue(true);
						slider.up("bloodsugar").spinned = true;
						$this.fireEvent("readingchanged", $this, value);
					}
				}
			}
		];
		
		this.callParent(arguments);
		
		this.spinned = false;
		
		if (subordinate) {
			this.subordinateTo(subordinate);
		}
	},
	
	hasntSpun: function() {
		return (this.spinned == false) && (this.down("togglefield").getValue() == 0);
	},
	
	setValue: function(val) {
		this.down("spinnerfield").setValue(val);
	},
	
	subordinateTo: function(sugarslider) {
		this.on("painted", function(subordinate) {
			if (typeof sugarslider == "string") sugarslider = Ext.Viewport.down(sugarslider);
			
			sugarslider.on("readingchanged", function (control, reading) {
				if (subordinate.hasntSpun()) {
					subordinate.setValue(reading);
				}
			});
		}, 100);
	}
})