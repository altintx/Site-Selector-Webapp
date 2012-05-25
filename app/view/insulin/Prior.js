Ext.define("SiteSelector.view.insulin.Prior", {
	extend: "Ext.dataview.component.DataItem",
	xtype: "insulinprior",
	config: {
		dateAndQty: {
			flex: 1
		},
		sparkLine: {
			flex: 4,
			type: "line",
			width: "100%",
			height: "1in",
			fillColor: undefined,
			lineWidth: 2,
			chartRangeMin: 0,
			chartRangeMax: 400,
			normalRangeMin: 70,
			normalRangeMax: 180
		},
		layout: {
			type: "hbox"
		},
		dataMap: {
			getDateAndQty: {
				setHtml: "when"
			},
			getSparkline: {
				setValues: "blood_sugars"
			}
		}
	},

	applyDateAndQty: function (config) {
		return Ext.factory(config, "Ext.Component", this.getDateAndQty())
	},
	updateDateAndQty: function(newF, oldF) {
		if (newF) {
			this.add(newF);
		}

		if (oldF) {
			this.remove(oldF);
		}
	},
	applySparkline: function (config) {
		return Ext.factory(Ext.apply(
			config,
			{
				values: []
			}
		), "sparkline", this.getSparkline())
	},
	updateSparkline: function(newF, oldF) {
		if (newF) {
			this.add(newF);
		}

		if (oldF) {
			this.remove(oldF);
		}
	}
})