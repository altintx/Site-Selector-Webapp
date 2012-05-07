Ext.define("SiteSelector.view.reports.SiteLog", {
	extend: "Ext.dataview.List",
	config: {
		itemTpl: new Ext.XTemplate('<table><tr><td rowspan="3"><div style="overflow-y:hidden;height:0.65in;margin-right:0.1in;"><div class="body-thumbnail-{side}" style="top:-{y*3.3}%;"><div class="circle site {kind}" style="' + 
			'left:{x}%;' +
			'top:{y}%;' +
			'margin-left:-0.125in;' +
			'margin-top:-0.125in;' +
			'">+</div></div></div></td><td><strong>{location}</strong> {type}</td></tr>' +
			'<tr><td>{dates}</td></tr></table>')
	},
	
	constructor: function(config) {
		config.store = Ext.create("Ext.data.Store", {
			fields: ["id", "x", "y", "location", "kind", "dates", "side", "type"]
		});
		
		Ext.data.StoreManager.get("Sites").each(function(site) {
			if (site.data.removed) {
				config.store.add({
					x: site.data.x * 100,
					side: site.data.side,
					y: site.data.y * 100,
					location: site.data.location,
					type: site.data.kind == "pump"? "Pump": "CGM",
					kind: this.data.kind,
					dates: site.data.when.toLocaleDateString() + " - " + site.data.removed.toLocaleDateString()
				});
			} else {
				config.store.add({
					side: site.data.side,
					x: site.data.x * 100,
					y: site.data.y * 100,
					location: site.data.location,
					type: site.data.kind == "pump"? "Pump": "CGM",
					kind: site.data.kind,
					dates: site.data.when.toLocaleDateString()
				});
				
			}
		})
			
		this.callParent([config]);
	}
});