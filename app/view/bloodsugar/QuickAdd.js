Ext.define("SiteSelector.view.bloodsugar.QuickAdd", {
	alias: "widget.quickbloodsugar",
	extend: "Ext.form.Panel",
	config: {
		items: [
			{
				xtype: "fieldset",
				layout: "hbox",
				items: [
					{
						xtype: "numberfield",
						label: "What's your current #bgnow?",
						labelAlign: "top",
						name: "reading",
						flex: 1
					},
					{
						xtype: "button",
						action: "save",
						text: "Save",
						width: "5em"
					}
				]
			}
		]
	}
})