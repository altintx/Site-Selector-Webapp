Ext.define("SiteSelector.view.SiteLog", {
	alias: "widget.SiteLog",
	extend: "Ext.dataview.List",
	config: {
		iconCls: "bookmarks",
		itemTpl: new Ext.XTemplate(
			'<table width=\"100%\"><tr>' +
			"<td width=\"20%\">{[this.siteType(values.kind)]}</td>" +
			'<td width=\"40%\">{[this.dateRangeForList(values.when, values.removed)]}</td>' +
			"<td width=\"40%\">{[this.location(values.side, values.location)]}</td>" +
			"</tr></table>",
			{
				dateRangeForList: function (when, removed) {
					var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
					var mS = months[when.getMonth()],
					    dS = when.getDate(), 
					    yS = when.getFullYear();
					if (removed != null) {
						var	mR = months[removed.getMonth()],
						    dR = removed.getDate(), 
						    yR = removed.getFullYear();
						if (yR != yS) {
							return (mS + " " + dS + " " + yS) + " - " + (mR + " " + dR + " " + yR);
						} else if (mS != mR) {
							return (mS + " " + dS) + " - " + (mR + " " + dR);
						} else {
							return mS + " " + dS + "-" + dR;
						}
					} else {
						return (mS + " " + dS);
					}
				},
				siteType: function(alias) {
					if (alias == "pump") {
						return "Pump";
					} else if (alias == "cgms") {
						return "CGM";
					}
				},
				location: function(side, location) {
					if (location != "unknown") return location;
					if (side == "front") return "Front"; else return "Back";
				}
			}
		),
		listeners: {
			activate: "activate"
		}
	},
	
	showHelp: function() {
		var help = Ext.Viewport.add({
			xtype: "panel",
			html: "<h3>To save this data as a spreadsheet:</h3><ol><li>Connect your iOS device to your computer.</li><li>In <strong>iTunes</strong>, click to the <strong>Apps</strong> tab.</li><li>Scroll down to <strong>File Sharing</strong></li><li>Choose <strong>Site Selector</strong>.</li><li>Choose <strong>export.csv</strong></li><li>Press <strong>Save to...</strong></li></ol>",
			style: 'opacity: 0.6;margin: 1em;',
			overlay: true,
			top: "1in",
			hideOnMaskTap: true,
		});
		// expire help after 5s
		Ext.Anim.run(help, 'fade', {
			after: function() {
				help.destroy();
			},
			out: true,
			delay: 10000
		})
		help.show();
	},
	
	activate: function() {
		if (this.helped) return;
		this.showHelp();
		this.helped = true;
	}
})