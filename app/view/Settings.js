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
				docked: "top"
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
					}
				],
				instructions: "Heals and lasts are in days",
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
					}
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
			{
				xtype: "fieldset",
				title: "Reminders",
				instructions: "You'll be reminded after the indicated number of days that it's time to change your site. If a reminder should be delivered during the quiet period, you'll be notified prematurely.",
				defaults: {
					labelWidth: "60%"
				},
				items: [
					{
						xtype: 'togglefield',
						name: 'usereminders',
						label: 'Use',
					},
					{
						xtype: "datetimepickerfield",
						name: "quiet_from",
						label: "Quiet From",
						picker: {
							slotOrder: ["hour", "minute", "ampm"],
							ampm: true
						},
						dateTimeFormat: "h:i:A"
					},
					{
						xtype: "datetimepickerfield",
						name: "quiet_to",
						label: "Quiet To",
						picker: {
							slotOrder: ["hour", "minute", "ampm"],
							ampm: true
						},
						dateTimeFormat: "h:i:A"
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