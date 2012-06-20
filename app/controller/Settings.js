Ext.define("SiteSelector.controller.Settings", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			form: {
				activate: 'activate',
				deactivate: 'doSave'
			},
			'navigationview': {
				show_settings: "show_settings"
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
	
	show_settings: function(navview) {
		navview.push({
			xtype: "settings",
			title: "Settings",
			record: SiteSelector.app.settings()
		})
	}
})