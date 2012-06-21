Ext.define("SiteSelector.view.reports.SiteLog", {
	extend: "Ext.dataview.List",
	alias: "widget.sitelogreport",
	config: {
		title: "Site Log",
		itemTpl: new Ext.XTemplate('<table><tr><td rowspan="3"><div style="overflow-y:hidden;height:0.65in;margin-right:0.1in;"><div class="body-thumbnail-{side}" style="top:-{y*3.3}%;"><div class="circle site {kind}" style="' + 
			'left:{x}%;' +
			'top:{y}%;' +
			'margin-left:-0.125in;' +
			'margin-top:-0.125in;' +
			'">+</div></div></div></td><td><strong>{location}</strong> {type}</td></tr>' +
			'<tr><td>{dates}</td></tr></table>')
	},
	
	constructor: function(config) {
		var namemap = {
			"pump": "Pump",
			"cgm": "CGM",
			"shot_bolus": "Bolus Shot",
			"shot_basal": "Basal Shot"
		};

		config.store = Ext.create("Ext.data.Store", {
			fields: ["id", "x", "y", "location", "kind", "dates", "side", "type", "when"],
			data: Ext.data.StoreManager.get("Sites").data.items.map(function(site) {
				if (site.data.removed) {
					return({
						x: site.data.x * 100,
						side: site.data.side,
						y: site.data.y * 100,
						location: site.data.location,
						type: namemap[site.data.kind],
						kind: site.data.kind,
						dates: site.data.when.toLocaleDateString() + " - " + site.data.removed.toLocaleDateString(),
						when: site.data.removed
					});
				} else {
					return({
						side: site.data.side,
						x: site.data.x * 100,
						y: site.data.y * 100,
						location: site.data.location,
						type: namemap[site.data.kind],
						kind: site.data.kind,
						dates: site.data.when.toLocaleDateString(),
						when: site.data.when
					});

				}
			})
		});
		
		config.store.sort("when", "desc");
			
		this.callParent([config]);
	}
});