Ext.define("SiteSelector.view.food.Add", {
	extend: "Ext.Panel",
	alias: "widget.addfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		width: (function(phone) {
			if (phone) {
				return "100%";
			} else {
				return "80%";
			}
		})(Ext.os.is.Phone),
		height: (function(phone) {
			if (phone) {
				return "100%";
			} else {
				return "50%";
			}
		})(Ext.os.is.Phone),
		layout: "fit",
		items: [
			{
				xtype: "titlebar",
				docked: "top",
				title: "Eat Food",
				items: [
					{
						align: "left",
						text: "Cancel",
						handler: function() {
							var view = this.up("addfood");
							setTimeout(function() {
								view.destroy();
							}, 10);
						}
					},
					{
						align: "right",
						text: "Done",
						handler: function() {
							var panel = this.up("addfood");
							var form = panel.down("formpanel");
							panel.fireEvent("save", form.getValues(), form.getRecord());
							panel.hide();
							setTimeout(function() {
								panel.destroy();
							}, 10);
						}
					}
				],
			},
			{
				xtype: "formpanel",
				items: [
					{
						xtype: "fieldset",
						layout: "vbox",
						items: [
							{
								xtype: "textfield",
								name: "description",
								label: false
							},
							{
								xtype: "numberfield",
								name: "carb_count",
								label: "Carbs"
							},
							{
								xtype: "container",
								layout: "hbox",
								items: [
									{
										xtype: "togglefield",
										name: "use_bgnow",
										label: false,
										flex: 1,
										ui: "small"
									},
									{
										xtype: "spinnerfield",
										name: "bgnow",
										label: "#bgnow",
										labelCls: "transparent_label",
										labelWidth: "40%",
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
										name: "use_cgmgnow",
										label: false,
										flex: 1,
										ui: "small"
									},
									{
										xtype: "spinnerfield",
										name: "cgmnow",
										label: "#cgmnow",
										labelCls: "transparent_label",
										labelWidth: "40%",
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
				]					
			}
		]
	},
	
	constructor: function(config) {
		this.callParent([config]);
		this.down("formpanel").setRecord(config.record);
		this.down("spinnerfield[name=bgnow]").setIncrement(SiteSelector.app.bgStep);
		this.down("spinnerfield[name=cgmnow]").setIncrement(SiteSelector.app.bgStep);
	}
	
});