Ext.define("SiteSelector.view.bloodsugar.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.EditBloodSugar",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "titlebar",
				docked: "top",
				title: "Edit Blood Sugar",
				items: [
					{
						align: "left",
						text: "Cancel",
						action: "cancel",
						handler: function() {
							this.up("EditBloodSugar").destroy();
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
					{
						xtype: "selectfield",
						name: "kind",
						label: "From",
						options: [
							{
								text: "Meter",
								value: "meter"
							},
							{
								text: "CGM",
								value: "cgm"
							}
						]
					},
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
						xtype: "spinnerfield",
						name: "reading",
						label: "Reading",
						minValue: 0,
						maxValue: 1000,
						increment: 1,
						cycle: false
					}
				]
			}
		]
	}
});