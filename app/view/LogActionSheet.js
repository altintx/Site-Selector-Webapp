Ext.define('SiteSelector.view.LogActionSheet', {
	extend: "Ext.ActionSheet",
	alias: 'widget.LogActionSheet',
	config: {
		items: [
		{
			text: 'Eat',
			action: "addfood",
			disabled: false
		},
		{
			text: 'Blood Sugar',
			action: "addbgnow"
		},
		{
			text: 'Exercise',
			action: "addexercise",
			disabled: true
		},
		{
			text: 'Sick',
			action: "addsick",
			disabled: true
		},
		{
			text: 'Insulin',
			action: "addinsulin",
			disabled: true
		},
		{
			text: 'Cancel',
			action: "cancel"
		}
		]
	}
});