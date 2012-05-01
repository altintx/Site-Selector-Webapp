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
						ui: "confirm",
						align: "right",
						action: "save"
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Pump & Insulin",
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
					{
						xtype: "numberfield",
						label: "Carb Ratio",
						name: "carb_ratio",
						minValue: 0,
						maxValue: 20
					},
					{
						xtype: "numberfield",
						label: "Correction Factor",
						name: "correction_factor",
						minValue: 0,
						maxValue: 100
					}
				]
			},
			{
				xtype: "fieldset",
				title: "CGM & Blood Sugar",
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
					},
					{
						xtype: "selectfield",
						label: "Units",
						options: [
							{
								text: "mg/dL",
								value: "us"
							}
						]
					},
					{
						xtype: "numberfield",
						label: "Target BG",
						name: "target_bg"
					}
				]
			},

			{
				xtype: "fieldset",
				title: "Reminders",
				instructions: "You'll be reminded after the indicated number of days that it's time to change your site.",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'togglefield',
						name: 'usereminders',
						label: 'Use',
					}
				]
			},
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