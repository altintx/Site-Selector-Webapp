Ext.define("SiteSelector.view.bloodsugar.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.AddBloodSugar",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "titlebar",
				docked: "top",
				title: "Add Blood Sugar",
				items: [
					{
						align: "left",
						text: "Cancel",
						action: "cancel",
						handler: function() {
							this.up("AddBloodSugar").destroy();
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
				],
				listeners: {
					change: function(select) {
						var label = "";
						if (select.getValue() == "bgnow") {
							label="CGM";
						} else {
							label="Meter";
						}
						console.log(select);
						Ext.getCmp("parity_type").setLabel(label);
					}
				}
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
			},
			{
				xtype: "container",
				layout: "hbox",
				items: [
					{
						xtype: "togglefield",
						name: "parity",
						label: false,
						flex: 1
					},
					{
						xtype: "spinnerfield",
						name: "parity_reading",
						label: "CGM",
						id: "parity_type",
						minValue: 0,
						maxValue: 1000,
						increment: 1,
						cycle: false,
						flex: 3
					}
				]
			}
		]
	}
});