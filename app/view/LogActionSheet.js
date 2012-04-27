Ext.define('SiteSelector.view.LogActionSheet', {
	extend: "Ext.ActionSheet",
	alias: 'widget.LogActionSheet',
	config: {
		items: [
			{
				text: 'Blood Sugar',
				alias: "addbgnow"
			},
			{
				text: 'Cancel',
				alias: "cancel"
			}
		]
	}
});