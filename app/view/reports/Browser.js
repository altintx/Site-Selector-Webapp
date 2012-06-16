Ext.define('SiteSelector.view.reports.Browser', {
	extend: "Ext.dataview.List",
	alias: "widget.reportbrowser",
	config: {
		itemTpl: "<div>{name}</div>",
		store: 'Reports'
	}
 });