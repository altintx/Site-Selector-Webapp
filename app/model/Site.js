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
			// {
			// 	name: "decays",
			// 	type: "int"
			// },
			{
				name: "location",
				type: "string"
			}
		]
	},
	
	decays: function () {
		switch (this.get("kind")) {
			case "pump":
				return SiteSelector.app.settings().get("pumpreuse");
			case "cgm":
				return SiteSelector.app.settings().get("cgmreuse");
		}
		return 0;
	}
});