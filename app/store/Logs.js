Ext.define("SiteSelector.store.Logs", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Log", "Ext.data.proxy.LocalStorage"],
	alias: "store.Logs",
	config: {
		model: "SiteSelector.model.Log",
		autoLoad: true,
	    proxy: {
	        type: 'localstorage',
	        id: 'rotator-app-store-Log',
	    },
		listeners: {
			write: 'exportFile'
		},
		grouper: {
			groupFn: function(record) {
				return record.get("when").toLocaleDateString();
			},
			sortProperty: "when"
		}
	},
	
	record: function(record, title, description, options) {
		options = Ext.applyIf(options || {}, { date_field: "when" });
		var when = options.date_field? (record.data[options.date_field] || new Date()): new Date(), R = null;
		var $this = this;
		if (!record.phantom) {
			R = this.add({
				model: record.stores[0].getModel().getName(),
				fk: record.getId(),
				when: when,
				title: title,
				description: description
			});
		} else {
			setTimeout(function() {
				R = $this.add({
					model: record.stores[0].getModel().getName(),
					fk: record.getId(),
					when: when,
					title: title,
					description: description
				});
			}, 100);
		}
		setTimeout(function() {
			$this.sync();
		}, 150);
	}
});