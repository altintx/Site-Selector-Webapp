Ext.define('SiteSelector.model.Setting', {
	extend: "Ext.data.Model",
	alias: "model.Setting",
	config: {
	    fields: [
			{
				name: "id",
				type: "int"
			},
	        {
				name: 'usepump', 
				type: 'int'
			},
	        {
				name: 'usecgms',  
				type: 'int'
			},
	        {
				name: 'pumpreuse',   
				type: 'int'
			},
	        {
				name: 'cgmreuse',   
				type: 'int'
			},
			{
				name: "gender",
				type: "string"
			},
			{
				name: "weight",
				type: "int"
			},
			{
				name: "height",
				type: "int"
			},
			{
				name: "pumplasts",
				type: "int"
			},
			{
				name: "cgmlasts",
				type: "int"
			},
			{
				name: "usereminders",
				type: "int"
			},
			{
				name: "usezoom",
				type: "int"
			},
			{
				name: "infusion_sites_consent",
				type: "int"
			},
			{
				name: "target_bg",
				type: "float"
			},
			{
				name: "carb_ratio",
				type: "int"
			},
			{
				name: "correction_factor",
				type: "int"
			},
			{
				name: "bgunits",
				type: "string"
			},
			{
				name: "version",
				type: "float"
			},
			{
				name: "bolusreuse",
				type: "int"
			},
			{
				name: "basalreuse",
				type: "int"
			},
			{
				name: "basallasts",
				type: "int"
			},
			{
				name: "quiet_from",
				type: "date"
			},
			{
				name: "quiet_to",
				type: "date"
			}
	    ]
	},
	
	updateUserBloodSugarUnits: function() {
		if (this.get("bgunits") == "mgdl") {
			Ext.data.StoreManager.get("BloodSugars").changeAllReadings("mgdl", { mmoll: function(x) { return parseInt(x * 18.0182) } });
			SiteSelector.app.bgStep = 1;
		} else {
			Ext.data.StoreManager.get("BloodSugars").changeAllReadings("mmoll", { mgdl: function(x) { return parseInt(x * 0.555) / 10 } });
			SiteSelector.app.bgStep = 0.1;
		}
	},
	
	quietAdjustedTime: function(date) {
		if (typeof date == "number") date = new Date(date);
		
		var QUIET_FROM = this.get("quiet_from"), QUIET_TO = this.get("quiet_to");
		var quietSpansDays = QUIET_FROM > QUIET_TO;
		if (quietSpansDays) {
			if (date > QUIET_FROM) {
				return QUIET_FROM;
			} else if (date < QUIET_TO) {
				return QUIET_FROM;
			} else {
				return date;
			}
		} else {
			if (date < QUIET_FROM) {
				return date;
			} else if (date > QUIET_TO) {
				return date;
			} else {
				return QUIET_FROM;
			}
		}
	}
});
