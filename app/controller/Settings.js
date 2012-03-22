Ext.define("SiteSelector.controller.Settings", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			saveButton: {
				tap: 'doSave'
			},
			form: {
				activate: 'activate'
			}
		},
		refs: {
			saveButton: 'Settings button[action=save]',
			form: 'Settings',
		}
	},
	doSave: function(button) {
		var form = button.up("formpanel");
		var r = form.getRecord();
		form.updateRecord(r);
		r.dirty = true;
		form.fireEvent("saved");
		
		// store sync
		this.getApplication().settingsStore.sync();
		Ext.Viewport.down("tabpanel").switchTo("front");
	},
	activate: function(form) {
		form.setRecord(SiteSelector.app.settings);
	}
})