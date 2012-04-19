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
			}/* ,
			{
				xtype: "container",
				layout: "hbox",
				items: [
					{
						xtype: "togglefield",
						name: "treat",
						label: false,
						flex: 1
					},
					{
						xtype: "spinnerfield",
						name: "treat_grams",
						label: "Treat: 0g",
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
						name: "insulin",
						label: false,
						flex: 1
					},
					{
						xtype: "spinnerfield",
						name: "insulin_units",
						label: "Insulin: 0U",
						minValue: 0,
						maxValue: 100,
						increment: 1,
						cycle: false,
						flex: 3
					}
				]
			}
			*/
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