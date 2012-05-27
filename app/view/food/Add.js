Ext.define("SiteSelector.view.food.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
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
							var form = this.up("addfood");
							form.fireEvent("save", form.getValues(), form.getRecord());
							form.hide();
							setTimeout(function() {
								form.destroy();
							}, 10);
						}
					}
				],
			},
			{
				xtype: "fieldset",
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
});