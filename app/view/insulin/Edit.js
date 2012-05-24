Ext.define("SiteSelector.view.insulin.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.editinsulin",
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