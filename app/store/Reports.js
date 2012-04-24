Ext.define("SiteSelector.store.Reports", {
	extend: "Ext.data.TreeStore",
	requires: ["SiteSelector.model.Report", "Ext.data.proxy.LocalStorage"],
	alias: "store.reports",
	config: {
		model: "SiteSelector.model.Report",
		autoLoad: true,
		defaultRootProperty: "items",
		root: {
			name: "Reports",
			items: [
				{
					name: "Site Effectiveness",
					xtype: "SiteSelector.view.reports.SiteEffectiveness",
					leaf: true
				}
			]
		}
	}
});