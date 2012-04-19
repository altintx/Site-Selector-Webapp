Ext.define("SiteSelector.controller.Reports", {
	extend: "Ext.app.Controller",
	config: {
		views: [
			"SiteSelector.view.reports.Browser",
			"SiteSelector.view.reports.SiteEffectiveness",
			"SiteSelector.view.reports.SiteAccuracy"
		],
		stores: [
			"SiteSelector.store.Reports"
		],
		
		control: {
			ListNav: {
				leafitemtap: 'ListNav_onLeafItemTap'
			}
		},
		refs: {
			ListNav: 'ReportBrowser'
		}
	},
	
	ListNav_onLeafItemTap: function(tree, list, ix, domTarget, record, event) {
		console.log("leafitemtap", record);
		tree.setDetailCard(Ext.create(
			record.get("xtype"),
			{}
		));
	}
});