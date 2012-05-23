Ext.define("SiteSelector.view.food.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.editfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "titlebar",
				docked: "top",
				title: "Edit Meal",
				items: [
					{
						align: "left",
						text: "Cancel",
						action: "cancel",
						handler: function() {
							this.up("AddFood").destroy();
						}
					},
					{
						align: "right",
						text: "Done",
						action: "save"
					}
				],
			},
			{
				xtype: "fieldset",
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
					{
						xtype: "textfield",
						name: "description",
						label: false
					},
					{
						xtype: "numberfield",
						name: "carbs",
						label: "Carbs"
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "togglefield",
								name: "use_bgnow",
								label: false,
								flex: 1
							},
							{
								xtype: "spinnerfield",
								name: "bgnow",
								label: "#bgnow",
								labelCls: "transparent_label",
								labelWidth: "40%",
								minValue: 0,
								maxValue: 1000,
								increment: 1,
								cycle: false,
								flex: 3
							}
						]
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "togglefield",
								name: "use_cgmgnow",
								label: false,
								flex: 1
							},
							{
								xtype: "spinnerfield",
								name: "cgmnow",
								label: "#cgmnow",
								labelCls: "transparent_label",
								labelWidth: "40%",
								minValue: 0,
								maxValue: 1000,
								increment: 1,
								cycle: false,
								flex: 3
							}
						]
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "togglefield",
								name: "use_insulin",
								label: false,
								flex: 1
							},
							{
								xtype: "spinnerfield",
								name: "Insulin",
								label: "Insulin",
								labelCls: "transparent_label",
								labelWidth: "40%",
								minValue: 0,
								maxValue: 100,
								increment: 0.1,
								cycle: false,
								flex: 3
							}
						]
					}
				]
			}
		]
	}
});