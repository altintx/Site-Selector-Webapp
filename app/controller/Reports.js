Ext.define("SiteSelector.controller.Reports", {
	extend: "Ext.app.Controller",
	config: {
		views: [
			"SiteSelector.view.reports.Browser",
			"SiteSelector.view.reports.SiteEffectiveness",
			"SiteSelector.view.reports.SiteLog"
		],
		stores: [
			"SiteSelector.store.Reports"
		],
		
		control: {
			ListNav: {
				itemtap: 'ListNav_onLeafItemTap'
			}
		},
		refs: {
			ListNav: 'reportbrowser'
		}
	},
	
	ListNav_onLeafItemTap: function(view, ix, domTarget, record, event) {
		Ext.Viewport.down("navigationview").push({
			xtype: record.get("xtype")
		})
	}
});