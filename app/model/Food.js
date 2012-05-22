Ext.define("SiteSelector.model.Food", {
	extend: "Ext.data.Model",
	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				name: "when",
				type: "date"
			},
			{
				name: "file_uri",
				type: "string"
			},
			{
				name: "description",
				type: "string"
			},
			{
				name: "longitude",
				type: "float"
			},
			{
				name: "latitude",
				type: "float"
			},
			{
				name: "friendly_location",
				type: "string"
			}
		]
	}
})