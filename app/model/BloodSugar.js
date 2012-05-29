Ext.define('SiteSelector.model.BloodSugar', {
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
				name: "reading",
				type: "float"
			},
			{
				name: "unit",
				type: "string"
			}
		]
	}
});