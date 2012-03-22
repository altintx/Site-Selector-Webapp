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
			}
		],		
	}
});