Ext.define('SiteSelector.view.LogActionSheet', {
	extend: "Ext.ActionSheet",
	alias: 'widget.LogActionSheet',
	config: {
		items: [
			{
				text: 'Blood Sugar',
				action: "addbgnow"
			},
			{
				text: 'Cancel',
				action: "cancel"
			}
		]
	}
});