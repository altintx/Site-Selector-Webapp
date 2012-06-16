Ext.define("SiteSelector.store.Reports", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Report", "Ext.data.proxy.LocalStorage"],
	alias: "store.reports",
	config: {
		model: "SiteSelector.model.Report",
		autoLoad: true,
		data: [
			{
				name: "Site Effectiveness",
				xtype: "siteeffectivenessreport",
				leaf: true
			},
			{
				name: "Site Log",
				xtype: "sitelogreport",
				leaf: true
			}
		]
	}
});