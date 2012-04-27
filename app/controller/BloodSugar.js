Ext.define("SiteSelector.controller.BloodSugar", {
	extend: "Ext.app.Controller",
	config: {
		views: [
			"SiteSelector.view.bloodsugar.Add",
			"SiteSelector.view.bloodsugar.Edit"
		],
		
		control: {
			addSaveButton: {
				tap: 'doAdd'
			},
			editSaveButton: {
				tap: 'doEdit'
			}
		},
		refs: {
			addSaveButton: 'AddBloodSugar button[action=save]',
			editSaveButton: 'EditBloodSugar button[action=save]',
			addWindow: 'AddBloodSugar'
		}
	},
	
	doAdd: function(button) {
		var form = button.up("formpanel");
		var value = form.getValues();
		var store = Ext.data.StoreManager.get("BloodSugars");

		store.add({
			when: value.when,
			kind: value.kind,
			reading: value.reading
		});
		if (value.parity) {
			store.add({
				when: value.when,
				kind: value.kind  == "meter"? "cgm": "meter",
				reading: value.parity_reading
			});
		}
		store.sync();
		form.destroy();
	},
	
	doEdit: function(button) {
		var form = button.up("formpanel");
		var r = form.getRecord();
		form.updateRecord(r);
		r.dirty = true;
		
		// store sync
		Ext.data.StoreManager.get("BloodSugars").sync();
		form.destroy();
	}
})