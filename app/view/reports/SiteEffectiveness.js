Ext.define("SiteSelector.view.reports.SiteEffectiveness", {
	extend: "Ext.dataview.List",
	config: {
		itemTpl: new Ext.XTemplate('<table><tr><td rowspan="2"><div style="overflow-y:hidden;height:0.75in;margin-right:0.1in;"><div class="body-thumbnail-{side}" style="top:-{y*2.25}%;"><div class="circle" style="' + 
			'left:{x}%;' +
			'top:{y}%;' +
			'background:-webkit-linear-gradient(bottom, #4A094A 52%, #8C4FA6 76%);'+
			'margin-left:-0.125in;' +
			'margin-top:-0.125in;' +
			'">+</div></div></div></td><td><strong>{location}</strong></td></tr>' +
			'<tr><td>eAG: {eag}<br />({[parseInt((values.eag-values.standard_dev)*100)/100]} - {[parseInt((values.eag+values.standard_dev)*100)/100]})</td></tr>' +
			'<tr><td colspan="2">Fastest Rise: {max_dec}<br />Fastest Fall: {max_inc}</td></tr></table>'),
		items: [
			{
				xtype: "button",
				text: "Definitions",
				docked: "bottom",
				handler: function() {
					Ext.create('Ext.Panel', {
						html: "<ul>" +
							"<li>The standard deviation indicates that 68% of the time, your logged blood sugars are within <em>StDev</em> pts of <em>eAG</em>. Lower is better.</li>" +
							"<li>Max Decrease is the fastest observed decrease in blood sugar. A higher number may suggest good insulin absorption, or you might have just taken too much insulin.</li>" +
							"<li>Max increase is the fastest observed increase in blood sugar. A higher number may suggest poor insulin absorption, or, too little insulin for a meal.</li>" +
							"</ul>",
						overlay: true,
						modal: true,
						hideOnMaskTap: true
					}).showBy(this)
				}
			}
		]
	},
	
	constructor: function(config) {
		var data = [],
			siteStore = Ext.data.StoreManager.get("Sites"),
			sugarStore = Ext.data.StoreManager.get("BloodSugars");
			
		siteStore.each(function(site) {
			if (site.get("when") == null || site.get("removed" || site.get("kind") == "cgm" ) == null) return;
			
			var plot = {
					x: site.data.x * 100,
					y: site.data.y * 100,
					readings: 0,
					standard_dev: 0,
					side: site.get("side"),
					location: site.get("location"),
					eag: 0,
					max_inc: 0,
					max_dec: 0
				},
				siteStarted = site.get("when").getTime(),
				siteEnded = site.get("removed").getTime(),
				readings = [],
				ix = 0,
				change = null,
				timespan = 0,
				rates_of_change = [];
			
			sugarStore.each(function(reading){
				if (reading.data.when.getTime() >= siteStarted && reading.data.when.getTime() <= siteEnded) {
					if (reading.get("kind") == "meter") {
						readings.push(reading);
					} else if ("cgm" in config) {
						readings.push(reading);
					}
				}
			});
			
			plot.readings = readings.length;
			
			// standard dev
			var reading_mean = readings.reduce(function(out, value) {
				return out + value.data.reading
			}, 0) / readings.length;
			var reading_diff = readings.map(function(r) { 
				return Math.pow(r.data.reading - reading_mean, 2);
			});
			plot.standard_dev = Math.sqrt(reading_diff.reduce(function(o, i) { return o + i}, 0) / readings.length);
			
			for (ix = 0; ix < readings.length - 1; ix++) {
				timespan = readings[ix + 1].data.when.getTime() - readings[ix].data.when.getTime();
				change = readings[ix + 1].data.reading - readings[ix].data.reading;
				plot.eag += (readings[ix].data.reading + change / 2);
				// 60000 is the number of milliseconds in a minute
				if (change <= 0) {
					plot.max_dec = Math.max(Math.abs(change) / (timespan / 60000), plot.max_dec);
				} else {
					plot.max_inc= Math.max(Math.abs(change) / (timespan / 60000), plot.max_inc);
				}
			}
			
			plot.eag /= (readings.length - 1);
			plot.eag = parseInt(plot.eag * 100) / 100;
			plot.standard_dev = parseInt(plot.standard_dev * 100) / 100;
			plot.max_inc = parseInt(plot.max_inc * 100) / 100 + " pts per Min";
			plot.max_dec = parseInt(plot.max_dec * 100) / 100 + " pts per Min";
			
			if (readings.length)
				data.push(plot);
		});
		
		config.store = Ext.create("Ext.data.Store", {
			sorters: "max_roc",
			data: data
		});
		
		this.callParent(arguments);
	}
});