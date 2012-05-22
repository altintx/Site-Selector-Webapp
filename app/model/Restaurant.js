Ext.define("SiteSelector.model.Restaurant", {
	extend: "Ext.data.Model",
	alias: "model.restaurant",
	config: {
		fields: [
			"id",
			"name",
			"url",
			"logo",
			"chain",
			"friendly_location",
			"longitude",
			"latitude",
			"foursquare_id",
			"distance"
		]
	}
});