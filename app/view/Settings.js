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
				title: "Pump",
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
				]
			},
			{
				xtype: "fieldset",
				title: "CGM",
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
				]
			},

			{
				xtype: "fieldset",
				title: "Reminders",
				instructions: "You'll be reminded after the indicated number of days that it's time to change your site.",
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
				instructions: "The body image can zoom in when you tap on it, so you can more accurately place sites",
				items: [
					{
						xtype: 'togglefield',
						name: 'usezoom',
						label: 'Enable',
					}
				]
			},
			
			{
				xtype: "fieldset",
				title: "Blood Sugar",
				instructions: "At this time, mg/dl is the only supported measure",
				items: [
					{
						xtype: "selectfield",
						label: "Units",
						options: [
							{
								text: "mg/dL",
								value: "us"
							}
						]
					}
				]
			}
		],		
	}
});