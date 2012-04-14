Ext.define("SiteSelector.view.Settings", {
	alias: "widget.Settings",
	extend: "Ext.form.FormPanel",
	requires: ["Ext.field.Number"],
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
				xtype: 'numberfield',
				label: 'Pump Regenerates',
				labelWidth: "100%",
				labelAlign: "top",
				name: "pumpreuse",
				minValue: 0,
				maxValue: 100
			},
			{
				xtype: "panel",
				html: "Tissue around pump sites takes this many days to heal"
			},
			{
				xtype: "numberfield",
				label: "Pump lasts",
				labelWidth: "100%",
				labelAlign: "top",
				name: "pumplasts",
				minValue: 0,
				maxValue: 100
			},
			{
				xtype: "panel",
				html: "This is how long you should leave your pump in"
			},
			{
				xtype: 'numberfield',
				label: 'CGM Regenerates',
				labelWidth: "100%",
				labelAlign: "top",
				name: "cgmreuse",
				minValue: 0,
				maxValue: 100
			},
			{
				xtype: "panel",
				html: "Tissue around CGM sites takes this many days to heal"
			},
			{
				xtype: "numberfield",
				label: "CGM lasts",
				labelWidth: "100%",
				labelAlign: "top",
				name: "cgmlasts",
				minValue: 0,
				maxValue: 100
			},
			{
				xtype: "panel",
				html: "This is how long you should leave your pump in"
			},
			{
				xtype: 'togglefield',
				name: 'usereminders',
				label: 'Remind me to change sites?',
				labelAlign: "top",
				labelWidth: '100%'
			}
		],		
	}
});