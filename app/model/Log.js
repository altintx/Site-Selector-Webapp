Ext.define('SiteSelector.model.Log', {
	extend: 'Ext.data.Model',

	config: {
		fields: [
			{
				name: "id",
				type: "int"
			},
			{
				type: "string",
				name: "model"
			},
			{
				type: "int",
				name: "fk"
			},
			{
				type: "date",
				name: "when"
			},
			{
				type: "string",
				name: "title"
			},
			{
				type: "string",
				name: "description"
			}
		]
	},
	
	getOwner: function() {
		var m = Ext.data.ModelManager.getModel(this.get("model"));
		var s = null;
		for (var ixStore = 0; ixStore < Ext.data.StoreManager.getCount(); ixStore++) {
			s = Ext.data.StoreManager.getAt(ixStore);
			if (s.getModel() == m) break;
		}
		m = s.getById(this.get("fk"));
		return m;
	}
});