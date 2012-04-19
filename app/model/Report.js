Ext.define("SiteSelector.model.Report", {
	extend: "Ext.data.Model",
	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				name: 'name', 
				type: 'string'
			},
			{
				name: "leaf",
				type: "boolean"
			},
			{
				name: "xtype",
				type: "string"
			}
		]
	}
});