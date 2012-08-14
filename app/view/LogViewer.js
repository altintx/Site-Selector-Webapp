Ext.define("SiteSelector.view.LogViewer", {
	alias: "widget.LogViewer",
	extend: "Ext.dataview.List",
	requires: [
		'Ext.DateExtras'
	],
	config: {
		iconCls: "bookmarks",
		itemTpl: new Ext.XTemplate(
			'<div class="deleteplaceholder"></div><table width=\"100%\"><tr>' +
			'<td width=\"50%\">{title}</td>' +
			"<td width=\"50%\" align=\"right\">{[Ext.Date.format(values.when, 'g:i A')]}</td></tr>" +
			"<tr><td width=\"100%\" colspan=\"2\">{description}</td>" +
			"</tr></table>"
		),
		grouped: true,
		items: [{
			xtype: "titlebar",
			docked: "top",
			title: "Log Book",
			items: [
				{
					align: "left",
					text: "Export",
					action: "export",
					handler: function() {
						var help = Ext.Viewport.add({
							xtype: "panel",
							html: "<h3>To save this data as a spreadsheet:</h3><ol><li>Connect your iOS device to your computer.</li><li>In <strong>iTunes</strong>, click to the <strong>Apps</strong> tab.</li><li>Scroll down to <strong>File Sharing</strong></li><li>Choose <strong>Site Selector</strong>.</li><li>Choose <strong>sites.csv</strong></li><li>Press <strong>Save to...</strong></li></ol>",
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
						help.showBy(this);
					}
				}
			]
		}]
	}
});