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
			}
	    ]
	}
});
