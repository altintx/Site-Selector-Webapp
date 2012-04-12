Ext.define("SiteSelector.view.LogViewer", {
	alias: "widget.LogViewer",
	extend: "Ext.dataview.List",
	config: {
		iconCls: "bookmarks",
		itemTpl: new Ext.XTemplate(
			'<table width=\"100%\"><tr>' +
			"<td width=\"30%\">{when}</td>" +
			'<td width=\"70%\">{title}</td></tr>' +
			"<tr><td width=\"100%\" colspan=\"2\">{description}</td>" +
			"</tr></table>"
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
		// expire help after 10s
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