Ext.define("SiteSelector.view.reports.SiteLog", {
	extend: "Ext.dataview.List",
	config: {
		itemTpl: new Ext.XTemplate('<table><tr><td rowspan="3"><div style="overflow-y:hidden;height:0.75in;margin-right:0.25in;"><div class="body-thumbnail-{side}" style="top:-{y*3}%;"><div class="circle" style="' + 
			'left:{x}%;' +
			'top:{y}%;' +
			'background:-webkit-linear-gradient(bottom, #4A094A 52%, #8C4FA6 76%);'+
			'margin-left:-0.125in;' +
			'margin-top:-0.125in;' +
			'">+</div></div></div></td><td><strong>{location}</strong> {kind}</td></tr>' +
			'<tr><td>{dates}</td></tr></table>')
	},
	
	constructor: function(config) {
		config.store = Ext.create("Ext.data.Store", {
			fields: ["id", "x", "y", "location", "kind", "dates", "side"]
		});
		
		Ext.data.StoreManager.get("Sites").each(function(site) {
			if (site.data.removed) {
				config.store.add({
					x: site.data.x * 100,
					side: site.data.side,
					y: site.data.y * 100,
					location: site.data.location,
					kind: site.data.kind == "pump"? "Pump": "CGM",
					dates: site.data.when.toLocaleDateString() + " - " + site.data.removed.toLocaleDateString()
				});
			} else {
				config.store.add({
					side: site.data.side,
					x: site.data.x * 100,
					y: site.data.y * 100,
					location: site.data.location,
					kind: site.data.kind == "pump"? "Pump": "CGM",
					dates: site.data.when.toLocaleDateString()
				});
				
			}
		})
			
		this.callParent(arguments);
	}
});