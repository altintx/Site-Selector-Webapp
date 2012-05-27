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
			sortProperty: "when",
			direction: "DESC"
		},
		sorters: [
			{
				sorterFn: function(a,b) {
					var c = a.data.when.getTime() - b.data.when.getTime()
					if (c > 0) {
						return 1
					} else if (c < 0) {
						return -1;
					} else {
						return 0;
					}
				}
			}
		]
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
	},
	
	getTimeRange: function (startDtTm, endDtTm) {
		var matches = [];
		this.each(function(record) {
			if (record.data.when >= startDtTm && record.data.when <= endDtTm) matches.push(record)
		});
		return matches;
	}
});