Ext.define("SiteSelector.controller.Insulin", {
	extend: "Ext.app.Controller",
	alias: "controller.insulin",
	config: {
		views: [
			"SiteSelector.view.insulin.Add",
			"SiteSelector.view.insulin.Edit"
		],
		refs: {
			"addinsulin": "addinsulin",
			"editinsulin": "editinsulin",
			'viewport': "navigationview"
		},
		control: {
			"addinsulin": {
				save: "doAdd"
			},
			"editinsulin": {
				save: "doEdit"
			},
			"viewport": {
				bolus: "add"
			}
		}
	},
	
	add: function(navigationview) {
		var record = new SiteSelector.model.Bolus();
		var bg = Ext.data.StoreManager.get("BloodSugars");
		record.set({
			when: new Date(),
			bgnow: bg.mostRecent(),
			cgmnow: bg.mostRecent(),
			normal: (bg.mostRecent() - SiteSelector.app.settings("target_bg")) / SiteSelector.app.settings("correction_factor"),
			duration: 0.5
		});
		
		navigationview.push({
			xtype: "addinsulin",
			title: "Add Insulin",
			record: record
		})
		
	},
	
	doAdd: function(form) {
		var meds = Ext.data.StoreManager.get("Medications"), bgnow_store = Ext.data.StoreManager.get("BloodSugars");
		var bolus = form.getRecord();
		form.updateRecord(bolus);
		bolus.set("blood_sugar", form.getValues().bgnow || form.getValues().cgmnow || undefined);
		bolus.dirty = true;
		meds.add(bolus);
		
		if (form.getValues().use_cgmnow) {
			bgnow_store.add({
				when: bolus.get("when"),
				kind: "cgm",
				reading: form.getValues().cgmnow,
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		if (form.getValues().use_bgnow) {
			bgnow_store.add({
				when: bolus.get("when"),
				kind: "meter",
				reading: form.getValues().bgnow,
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		meds.sync();
		bgnow_store.sync();
	},
	
	doEdit: function(form) {
		var meds = Ext.data.StoreManager.get("Medications");
		var bolus = form.getRecord();
		form.updateRecord(bolus);
		bolus.dirty = true;
		meds.sync();
	}
});