Ext.define("SiteSelector.view.SiteEdit", {
	extend: "Ext.form.Panel",
	alias: "widget.SiteEdit",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker'],
	config: {
		scroll: 'vertical',
		items: [
			(function(config) {
				if (Ext.is.Phone) {
					config.picker.slotOrder.push("ampm");
					config.dateTimeFormat = 'm/d/Y - gA';
				} else {
					config.picker.slotOrder.push("minutes");
					config.picker.slotOrder.push("ampm");
					config.dateTimeFormat = 'm/d/Y h:i:A';
				}
				return config;
			})({
				xtype: 'datetimepickerfield',
				name : 'when',
				label: "Placed",
				labelWidth: "100%",
				labelAlign: "top",
				picker: {
					yearFrom: 2012,
					ampm : true,
					slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
				}
			}),
			// {
			// 	xtype: 'datetimepickerfield',
			// 	name : 'when',
			// 	label: "Placed",
			// 	labelWidth: "100%",
			// 	labelAlign: "top",
			// 	picker: {
			// 		yearFrom: 2012,
			// 		minuteInterval : 1,
			// 		ampm : true,
			// 		slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
			// 	}
			// },
			// {
			// 	xtype: 'datetimepickerfield',
			// 	name : 'removed',
			// 	label: "Removed",
			// 	labelWidth: "100%",
			// 	labelAlign: "top",
			// 	picker: {
			// 		yearFrom: 2022,
			// 		minuteInterval : 1,
			// 		ampm : true,
			// 		slotOrder: ['month', 'day', 'year','hour','minute','ampm']
			// 	}
			// },
			(function(config) {
				if (Ext.is.Phone) {
					config.picker.slotOrder.push("ampm");
					config.dateTimeFormat = 'm/d/Y - gA';
				} else {
					config.picker.slotOrder.push("minutes");
					config.picker.slotOrder.push("ampm");
					config.dateTimeFormat = 'm/d/Y h:i:A';
				}
				return config;
			})({
				xtype: 'datetimepickerfield',
				name : 'removed',
				label: "Removed",
				labelWidth: "100%",
				labelAlign: "top",
				picker: {
					yearFrom: 2012,
					ampm : true,
					slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
				}
			}),

			{
				xtype: "selectfield",
				name: "kind",
				label: "Type of Site",
				labelWidth: "100%",
				labelAlign: "top",
				options: [
					{
						text: "Pump",
						value: "pump"
					},
					{
						text: "CGMS",
						value: "cgm"
					}
				]
			},
			{
				xtype: "button",
				text: "Delete",
				ui: "decline",
				docked: "bottom",
				style: {
					margin: "0.125in"
				},
				handler: function() {
					var $this = this;
					Ext.Msg.confirm("Remove this site", "Are you sure you want to remove this site?", function(button) {
						if (button == "yes") {
							var form = $this.parent;
							var store = Ext.data.StoreManager.get("Sites");
							store.remove(form.getRecord());
							store.sync();
							form.destroy();
							Ext.ComponentQuery.query("BodyList").map(function(list) {
								list.clearSites();
								list.drawSites(); 
							});
						}
					});
				}
			},
			{
				xtype: "button",
				text: "Save",
				ui: "confirm",
				docked: "bottom",
				style: {
					margin: "0.125in"
				},
				handler: function() {
					// save
					var form = this.parent;
					var r = form.getRecord();
					form.updateRecord(r);
					r.dirty = true;
					var siteStore = Ext.data.StoreManager.get("Sites");
					siteStore.sync();
					siteStore.sort(siteStore.sorters);
					form.destroy();
					Ext.ComponentQuery.query("BodyList").map(function(list) {
						list.clearSites();
						list.drawSites(); 
					});
				}
			}
		]
	}
	// 
	// constructor: function(config) {
	// 	debugger;
	// 	if (Ext.is.Phone) {
	// 		config.items[0].picker.slotOrder.push("ampm");
	// 		config.items[0].dateTimeFormat = 'm/d/Y hA';
	// 	} else {
	// 		config.items[0].picker.slotOrder.push("minutes");
	// 		config.items[0].picker.slotOrder.push("ampm");
	// 		config.items[0].dateTimeFormat = 'm/d/Y h:i:A';
	// 	}
	// 	this.callParent(config);
	// }
});