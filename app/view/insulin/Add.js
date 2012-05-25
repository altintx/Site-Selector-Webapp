Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addinsulin",
	config: {
		items: [
			{
				xtype: "titlebar",
				title: "Insulin",
				docked: "top"
			},
			{
				xtype: "fieldset",
				title: "Bolus",
				items: [
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "spinnerfield",
								name: "normal",
								label: "Normal",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false
							},
							{
								xtype: "spinnerfield",
								name: "wave",
								label: "Extended",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false
							}
						]
					}
				]
			}			
		]
	},
	
	constructor: function(config) {
		var priors = config.priors;
		delete config.priors;
		this.callParent([config]);
		
		this.add({
			xtype: "dataview",
			
		})
	},
})