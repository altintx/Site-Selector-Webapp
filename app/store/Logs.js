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
		sorters: 'when',
		listeners: {
			write: 'exportFile'
		}
	},
	
	record: function(record, title, description) {
		var when = new Date(), R = null;
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