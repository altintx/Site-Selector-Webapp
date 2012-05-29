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
			}
	    ]
	},
	
	updateUserBloodSugarUnits: function() {
		if (this.get("bgunits") == "mgdl") {
			// SiteSelector.app.getBloodSugarInUserUnits = function(mgdl) {
			// 	return mgdl;
			// }
			// SiteSelector.app.getUserBgInMgDl = function(mgdl) {
			// 	return mgdl;
			// }
			Ext.data.StoreManager.get("BloodSugars").changeAllReadings("mgdl", { mmoll: function(x) { return parseInt(x * 18.0182) } });
			SiteSelector.app.bgStep = 1;
		} else {
			// SiteSelector.app.getBloodSugarInUserUnits = function(mgdl) {
			// 	return mgdl * x 0.0555;
			// }
			// SiteSelector.app.getUserBgInMgDl = function(mgdl) {
			// 	return mgdl * 18.0182;
			// }
			Ext.data.StoreManager.get("BloodSugars").changeAllReadings("mmoll", { mgdl: function(x) { return parseInt(x * 0.555) / 10 } });
			SiteSelector.app.bgStep = 0.1;
		}
	}
});
