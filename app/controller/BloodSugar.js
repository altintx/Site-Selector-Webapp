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
			},
			quickformSave: {
				tap: "doQuickAdd"
			}
		},
		refs: {
			addSaveButton: 'AddBloodSugar button[action=save]',
			editSaveButton: 'EditBloodSugar button[action=save]',
			addWindow: 'AddBloodSugar',
			quickform: 'quickbloodsugar',
			quickformSave: 'quickbloodsugar button[action=save]'
		},
		stores: ["BloodSugars"]
	},
	
	doAdd: function(button) {
		var form = button.up("formpanel");
		var value = form.getValues();
		var store = Ext.data.StoreManager.get("BloodSugars");
		var settings = SiteSelector.app.settings();
		var u = settings.get("bgunits");

		store.add({
			when: value.when,
			kind: value.kind,
			reading: value.reading,
			unit: u
		});
		if (value.parity) {
			store.add({
				when: value.when,
				kind: value.kind  == "meter"? "cgm": "meter",
				reading: value.parity_reading,
				unit: u
			});
		}
		store.sync();
		form.destroy();
	},
	
	doQuickAdd: function(button) {
		var form = button.up("formpanel");
		var value = form.getValues();
		var store = Ext.data.StoreManager.get("BloodSugars");

		store.add({
			when: new Date(),
			kind: "meter",
			reading: value.reading,
			unit: SiteSelector.app.settings("bgunits")
		});
		store.sync();
		form.reset();
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