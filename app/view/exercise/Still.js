Ext.define("SiteSelector.view.exercise.Still", {
	extend: "Ext.List",
	alias: "widget.stillexercising",
	config: {
		title: "Ongoing",
		itemTpl: "<div>{action}<br />Started at: {when}</div>"
	},
	initialize: function() {
		this.callParent();
		var nv = Ext.Viewport.down("navigationview");
		this.on("painted", function($this) {
			nv.on("back", function(nv) {
				$this.hide();
			}, true);
			var newb = nv.getNavigationBar().add({
				align: "right",
				text: "New",
				handler: function() {
					$this.fireEvent("new");
				}
			})
			$this.on("hide", function() {
				newb.hide();
			});
			$this.on("show", function() {
				newb.show();
			});
			$this.on("destroy", function() {
				newb.destroy();
			})
			$this.on("itemtap", function(list, ix, target, record) {
				$this.fireEvent("edit", record);
			})
		});
	}
})