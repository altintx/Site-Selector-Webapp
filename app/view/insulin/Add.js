Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addinsulin",
	config: {
		items: [
			{
				xtype: "titlebar",
				title: "Insulin",
				docked: "top"
			}
		]
	},
	
	constructor: function(config) {
		var priors = config.priors;
		delete config.priors;
		this.callParent([config]);
		
		
	}
})