Ext.define('SiteSelector.view.reports.Browser', {
	extend: "Ext.NestedList",
	alias: "widget.ReportBrowser",
	config: {
		displayField: 'name',
		store: 'Reports'
	}
 });