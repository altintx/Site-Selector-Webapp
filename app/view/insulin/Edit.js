Ext.define("SiteSelector.view.insulin.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.editinsulin",
	config: {
		items: [
			{
				xtype: "fieldset",
				title: "Insulin",
				items: [
					{
						xtype: "container",
						layout: "hbox",
						defaults: {
							labelAlign: "top"
						},
						items: [
							{
								xtype: "spinnerfield",
								name: "normal",
								label: "Bolus",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false,
								flex: 1
							},
							{
								xtype: "spinnerfield",
								name: "wave",
								label: "Extended",
								minValue: 0,
								maxValue: 50,
								increment: 0.1,
								cycle: false,
								flex: 1
							}
						]
					}
				]
			}
		]
	},
	
	initialize: function() {
		this.callParent(arguments);
		var $this = this;
		setTimeout(function() {
			debugger;
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
				text: "Save",
				handler: function() {
					var view = Ext.Viewport.down("editinsulin");
					view.fireEvent("save", view);
					view.up("navigationview").pop();
				},
				align: "right"
			})
			$this.on("destroy", function() {
				done.destroy();
			});
		}, 10);
	},
	
})