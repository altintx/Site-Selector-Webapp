Ext.define("SiteSelector.model.Bolus", {
	extend: "Ext.data.Model",
	alias: "model.bolus",
	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				name: "blood_sugar",
				type: "int"
			},
			{
				name: "carbs",
				type: "int"
			},
			{
				name: "normal",
				type: "float"
			},
			{
				name: "wave",
				type: "float"
			}
		]
	}
});

