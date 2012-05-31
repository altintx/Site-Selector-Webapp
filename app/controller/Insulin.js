Ext.define("SiteSelector.controller.Insulin", {
	extend: "Ext.app.Controller",
	alias: "controller.insulin",
	config: {
		views: [
			"SiteSelector.view.insulin.Add",
			"SiteSelector.view.insulin.Edit"
		],
		refs: {
			"addinsulin": "addinsulin"
		},
		control: {
			"addinsulin": {
				save: "doAdd"
			}
		}
	},
	
	doAdd: function(form) {
		var bolus = form.getRecord();
		form.updateRecord(bolus);
		bolus.dirty = true;
		Ext.data.StoreManager.get("Medications").sync();
	}
});