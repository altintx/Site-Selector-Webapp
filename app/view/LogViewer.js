Ext.define("SiteSelector.view.LogViewer", {
	alias: "widget.logviewer",
	extend: "Ext.dataview.List",
	config: {
		iconCls: "bookmarks",
		store: "Logs",
		itemTpl: new Ext.XTemplate(
			'<div class="deleteplaceholder"></div><table width=\"100%\"><tr>' +
			'<td width=\"50%\">{title}</td>' +
			"<td width=\"50%\" align=\"right\">{[((values.when.getHours()-1)%12+1)||12]}:{[('0'+values.when.getMinutes()).substr(-2)]} {[(values.when.getHours()>11)? 'PM': 'AM']}</td></tr>" +
			"<tr><td width=\"100%\" colspan=\"2\">{description}</td>" +
			"</tr></table>"
		),
		grouped: true,
	},
	
	initialize: function(v) {
		this.callParent(arguments);
		
		this.on("painted", function($this) {
			$this.up("navigationview").on("back", function(nv) {
				$this.hide();
			});
			var tb = $this.up("navigationview").getNavigationBar();
			var more = tb.add({
				align: "right",
				text: "Reports",
				handler: function(b) {
					var menu = new Ext.ActionSheet({
						items: [
							{
								text: "Export",
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
									help.showBy(b);
									menu.destroy();
								}
							},
							{
								text: "Reports",
								handler: function() {
									$this.up("navigationview").push({
										xtype: "reportbrowser",
										title: "Reports"
									});
									menu.destroy();
								}
							},
							{
								text: "Cancel",
								handler: function() {
									menu.destroy();
								}
							}
						]
					});
					menu.show();
				}
			});
			$this.on("destroy", function() {
				more.destroy();
			});
			$this.on("hide", function() {
				more.hide();
			});
			$this.on("show", function() {
				more.show();
			});
		});	
	}
});