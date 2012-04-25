Ext.define('SiteSelector.model.Site', {
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
				name: 'removed',
				type: 'date',
				dateFormat: "c"
			},
			{
				name: 'x',
				type: 'float'
			},
			{
				name: 'y',
				type: 'float'
			},
			{
				name: "side",
				type: "string"
			},
			{
				name: "location",
				type: "string"
			}
		]
	},
	
	decays: function () {
		switch (this.get("kind")) {
			case "pump":
				return 1000 * 60 * 60 * 24 * SiteSelector.app.settings().get("pumpreuse");
			case "cgm":
				return 1000 * 60 * 60 * 24 * SiteSelector.app.settings().get("cgmreuse");
		}
		return 0;
	},
	
	lasts: function() {
		switch (this.get("kind")) {
			case "pump":
				return SiteSelector.app.settings().get("pumplasts");
			case "cgm":
				return SiteSelector.app.settings().get("cgmlasts");
		}
		return 0;
	}
});