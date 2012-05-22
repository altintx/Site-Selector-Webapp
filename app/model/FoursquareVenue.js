Ext.define("SiteSelector.model.FoursquareVenue", {
	extend: "Ext.data.Model",
	alias: "model.foursquarevenue",
	config: {
		fields: [
			"location",
			"id",
			"name",
			"distance"
		]
	}
})