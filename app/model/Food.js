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
				name: "friendly_location",
				type: "string"
			},
			{
				name: "foursquare_id",
				type: "string"
			},
			{
				name: "carb_count",
				type: "int"
			},
			{
				name: "insulin_id",
				type: "int"
			}
		]
	},
	
	getAffected: function() {
		var start = this.get("when"), $this = this;
		var end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
		var record = {
			meal: this,
			insulin: null,
			blood_sugars: []
		};
		
		// get everything in time range
		// exclude self (first item)
		// iterate until true
		Ext.data.StoreManager.get("Logs").getTimeRange(start, end).some(function(log_entry) {
			var d = log_entry.getOwner();
			if (d != $this) {
				switch (log_entry.data.model) {
					case "SiteSelector.model.BloodSugar":
						record.blood_sugars.push(d);
						return false;
					case "SiteSelector.model.Bolus":
						if (record.insulin) {
							return true;
						} else {
							record.insulin = d;
						}
						return false;
					case "SiteSelector.model.Food":
						return true;
				}
			}
		});
		return record;
	}
})