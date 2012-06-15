Ext.define("SiteSelector.view.food.Add", {
	extend: "Ext.Panel",
	alias: "widget.addfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		layout: "fit",
		title: "Eat Food",
		items: [
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
					},
					{
						xtype: "fieldset",
						title: "Photo",
						items: [
							{
								xtype: "textfield"
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
	},
	initialize: function() {
		var $this = this;
		setTimeout(function() {
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
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
			})
			$this.on("destroy", function() {
				done.destroy();
			})
		}, 10);
	},
	
});