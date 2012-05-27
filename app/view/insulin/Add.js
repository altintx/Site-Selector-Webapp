Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addinsulin",
	requires: ["SiteSelector.view.insulin.Prior"],
	config: {
		items: [
			{
				xtype: "titlebar",
				title: "Insulin",
				docked: "top",
				items: [
					{
						text: "Cancel",
						handler: function() {
							var view = this.up("addinsulin");
							view.fireEvent("cancel", view);
							view.hide();
							setTimeout(function() {
								view.destroy();
							}, 10);
						},
						align: "left"
					},
					{
						text: "Save",
						handler: function() {
							var view = this.up("addinsulin");
							view.fireEvent("save", view);
							view.hide();
							setTimeout(function() {
								view.destroy();
							}, 10);
						},
						align: "right"
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Bolus",
				items: [
					{
						xtype: "container",
						layout: "hbox",
						defaults: {
							labelAlign: "top"
						},
						items: [
							{
								xtype: "spinnerfield",
								name: "normal",
								label: "Normal",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false,
								flex: 1
							},
							{
								xtype: "spinnerfield",
								name: "wave",
								label: "Extended",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false,
								flex: 1
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
			useComponents: true,
			defaultType: "insulinprior"	,
			store: priors
		})
	},
})