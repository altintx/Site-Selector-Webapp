Ext.define("SiteSelector.controller.Settings", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			form: {
				activate: 'activate',
				deactivate: 'doSave'
			}
		},
		refs: {
			form: 'Settings',
		}
	},
	doSave: function(form) {
		var r = form.getRecord();
		form.updateRecord(r);
		r.dirty = true;
		form.fireEvent("saved");
		
		// store sync
		this.getApplication().settingsStore.sync();
	},
	activate: function(form) {
		form.setRecord(SiteSelector.app.settings());
	}
})