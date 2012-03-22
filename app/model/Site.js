Ext.define('SiteSelector.model.Site', {
	extend: 'Ext.data.Model',

	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				name: 'kind', 
				type: 'string'
			},
			{
				name: 'when',
				type: 'date',
				dateFormat: "c"
			},
			{
				name: 'x',
				type: 'float'
			},
			{
				name: 'y',
				type: 'float'
			},
			{
				name: "side",
				type: "string"
			},
			{
				name: "decays",
				type: "int"
			},
			{
				name: "location",
				type: "string"
			}
		]
	}
});