Ext.define('SiteSelector.view.LogActionSheet', {
	extend: "Ext.ActionSheet",
	alias: 'widget.LogActionSheet',
	config: {
		items: [
		{
			text: 'Eat',
			alias: "addfood",
			disabled: true
		},
		{
			text: 'Blood Sugar',
			alias: "addbgnow"
		},
		{
			text: 'Exercise',
			alias: "addexercise",
			disabled: true
		},
		{
			text: 'Sick',
			alias: "addsick",
			disabled: true
		},
		{
			text: 'Insulin',
			alias: "addinsulin",
			disabled: true
		},
		{
			text: 'Cancel',
			alias: "cancel"
		}
		]
	}
});