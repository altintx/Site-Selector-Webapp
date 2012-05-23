Ext.define("SiteSelector.view.SiteEdit", {
	extend: "Ext.form.Panel",
	alias: "widget.SiteEdit",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		width: (function(phone) {
			if (phone) {
				return "100%";
			} else {
				return "80%";
			}
		})(Ext.os.is.Phone),
		height: (function(phone) {
			if (phone) {
				return "100%";
			} else {
				return "50%";
			}
		})(Ext.os.is.Phone),
		items: [
			{
				xtype: "fieldset",
				defaults: {
					labelWidth: "35%"
				},
				items: [
					(function(config) {
						if (Ext.os.is.Phone) {
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y gA';
						} else {
							config.picker.slotOrder.push("minute");
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y h:i:A';
						}
						return config;
					})({
						xtype: 'datetimepickerfield',
						name : 'when',
						label: "Placed",
						picker: {
							yearFrom: 2012,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
						}
					}),
					(function(config) {
						if (Ext.os.is.Phone) {
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y gA';
						} else {
							config.picker.slotOrder.push("minute");
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y h:i:A';
						}
						return config;
					})({
						xtype: 'datetimepickerfield',
						name : 'removed',
						label: "Removed",
						picker: {
							yearFrom: 2022,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour']
						}
					}),
					{
						xtype: "selectfield",
						name: "kind",
						label: "Kind",
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
						xtype: "selectfield",
						name: "orientation",
						label: "Orientation",
						options: [
							{
								text: "+ Default",
								value: "+"
							},
							{
								text: "↑ Up",
								value: "↑"
							},
							{
								text: "↓ Down",
								value: "↓"
							},
							{
								text: "← Left",
								value: "←"
							},
							{
								text: "→ Right",
								value: "→"
							}
						]
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
});