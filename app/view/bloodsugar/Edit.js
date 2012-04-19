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
						action: "cancel"
					},
					{
						align: "right",
						text: "Done",
						action: "save"
					}
				],
			},
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
			{
				xtype: 'datetimepickerfield',
				name : 'when',
				label: "Placed",
				picker: {
					yearFrom: 2012,
					ampm : true,
					slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
				}
			},
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
	},
	
	constructor: function(config) {
		Ext.applyIf(config, this.config);
		
		if (config.items[2].picker.slotOrder.indexOf("ampm") == -1) {
			if (Ext.os.is.Phone) {
				config.items[2].picker.slotOrder.push("ampm");
				config.items[2].dateTimeFormat = 'm/d/Y gA';
			} else {
				config.items[2].picker.slotOrder.push("minute");
				config.items[2].picker.slotOrder.push("ampm");
				config.items[2].dateTimeFormat = 'm/d/Y h:i:A';
			}
		}
		
		this.callParent(arguments);
	}
});