Ext.define("SiteSelector.model.Exercise", {
	extend: "Ext.data.Model",
	alias: "model.exercise",
	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				name: "action",
				type: "string"
			},
			{
				name: "duration",
				type: "int"
			},
			{
				name: "carb_load",
				type: "int"
			},
			{
				name: 'when',
				type: 'date',
				dateFormat: "c"
			}
		]
	}
})