Ext.define("SiteSelector.view.Settings", {
	alias: "widget.Settings",
	extend: "Ext.form.FormPanel",
	requires: ["Ext.field.Number", "Ext.form.FieldSet"],
	config: {
		title: "Settings",
		iconCls: "settings",
		items: [
			{
				title: "Settings",
				xtype: "titlebar",
				docked: "top",
				items: [
					{
						text: "Save",
						align: "right",
						action: "save"
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Pump",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'numberfield',
						label: 'Heals',
						name: "pumpreuse",
						minValue: 0,
						maxValue: 100
					},
					{
						xtype: "numberfield",
						label: "Lasts",
						name: "pumplasts",
						minValue: 0,
						maxValue: 100
					},
					// {
					// 	xtype: "numberfield",
					// 	label: "Carb Ratio",
					// 	name: "carb_ratio",
					// 	minValue: 0,
					// 	maxValue: 20
					// },
					// {
					// 	xtype: "numberfield",
					// 	label: "Correction Factor",
					// 	name: "correction_factor",
					// 	minValue: 0,
					// 	maxValue: 100
					// }
				],
				instructions: "Heals and lasts are in days",
			},
			{
				xtype: "fieldset",
				title: "CGM",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'numberfield',
						label: 'Heals',
						name: "cgmreuse",
						minValue: 0,
						maxValue: 100
					},
					{
						xtype: "numberfield",
						label: "Lasts",
						name: "cgmlasts",
						minValue: 0,
						maxValue: 100
					}
					// {
					// 	xtype: "selectfield",
					// 	label: "Units",
					// 	name: "bgunits",
					// 	options: [
					// 		{
					// 			text: "mg/dL",
					// 			value: "mgdl"
					// 		},
					// 		{
					// 			text: "mmol/L",
					// 			value: "mmoll"
					// 		}
					// 	],
					// 	listeners: {
					// 		change: function(select, record) {
					// 			var v = select.up("formpanel").down("numberfield[name=target_bg]");
					// 			if (record.get("value") == "mmoll") {
					// 				v.setValue(parseInt(0.555 * v.getValue()) / 10);
					// 			} else {
					// 				v.setValue(parseInt(18.0182 * v.getValue()));
					// 			}
					// 		}
					// 	}
					// },
					// {
					// 	xtype: "numberfield",
					// 	label: "Target BG",
					// 	name: "target_bg"
					// }
				],
				instructions: "Heals and Lasts are in days.",
			},
			{
				xtype: "fieldset",
				title: "Shots",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'numberfield',
						label: 'Bolus Heals',
						name: "bolusreuse",
						minValue: 0,
						maxValue: 336
					},
					{
						xtype: "numberfield",
						label: "Basal Heals",
						name: "basalreuse",
						minValue: 0,
						maxValue: 336
					},
					{
						xtype: "numberfield",
						label: "Basal Lasts",
						name: "basallasts",
						minValue: 0,
						maxValue: 48
					}
				],
				instructions: "Heals and Lasts are in hours."
			},
			// {
			// 	xtype: "fieldset",
			// 	title: "Reminders",
			// 	instructions: "You'll be reminded after the indicated number of days that it's time to change your site.",
			// 	defaults: {
			// 		labelWidth: "60%"
			// 	},
			// 	items: [
			// 		{
			// 			xtype: 'togglefield',
			// 			name: 'usereminders',
			// 			label: 'Use',
			// 		}
			// 	]
			// },
			{
				xtype: "fieldset",
				title: "Zoom",
				defaults: {
					labelWidth: "60%"
				},
				instructions: "The body image can zoom in when you tap on it, so you can more accurately place sites",
				items: [
					{
						xtype: 'togglefield',
						name: 'usezoom',
						label: 'Enable',
					}
				]
			}
		],		
	}
});