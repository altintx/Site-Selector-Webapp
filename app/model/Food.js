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
			}
		]
	},
	
	getAffected: function() {
		debugger;
		var start = this.get("when");
		var end = new Date(start.getTime() + 6 * 60 * 60 * 1000);
		var record = {
			meal: this,
			bolus: null,
			wave: null,
			blood_sugars: []
		};
		
		Ext.data.StoreManager.get("Logs").getTimeRange(start, end).some(function(log_entry) {
			switch (log_entry.data.model) {
				case "SiteSelector.model.BloodSugar":
					record.blood_sugars.push(log_entry.getOwner());
					return false;
				case "SiteSelector.model.Insulin":
					var i = log_entry.getOwner();
					if (i.data.type == "bolus") {
						if (record.bolus) {
							return true;
						} else {
							record.bolus = i;
						}
					} else if (i.data.type == "wave") {
						if (record.wave) {
							return true;
						} else {
							record.wave = i;
						}
					}
					return false;
				case "SiteSelector.model.Food":
					return true;
			}
		});
		return record;
	}
})