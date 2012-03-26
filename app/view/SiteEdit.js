Ext.define("SiteSelector.view.SiteEdit", {
	extend: "Ext.form.Panel",
	alias: "widget.SiteEdit",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select'],
	config: {
		scroll: 'vertical',
		items: [
			{
				xtype: "datepickerfield",
				name: "when",
				label: "Placed",
				labelWidth: "100%",
				labelAlign: "top"
			},
			{
				xtype: "selectfield",
				name: "kind",
				label: "Type of Site",
				labelWidth: "100%",
				labelAlign: "top",
				options: [
					{
						text: "Pump",
						value: "pump"
					},
					{
						text: "CGMS",
						value: "cgm"
					}
				]
			},
			{
				xtype: "button",
				text: "Delete",
				ui: "decline",
				docked: "bottom",
				style: {
					margin: "0.125in"
				},
				handler: function() {
					var $this = this;
					Ext.Msg.confirm("Remove this site", "Are you sure you want to remove this site?", function(button) {
						if (button == "yes") {
							var form = $this.parent;
							var store = Ext.data.StoreManager.get("Sites");
							store.remove(form.getRecord());
							store.sync();
							form.destroy();
							Ext.ComponentQuery.query("BodyList").map(function(list) {
								list.clearSites();
								list.drawSites(); 
							});
						}
					});
				}
			},
			{
				xtype: "button",
				text: "Save",
				ui: "confirm",
				docked: "bottom",
				style: {
					margin: "0.125in"
				},
				handler: function() {
					// save
					var form = this.parent;
					var r = form.getRecord();
					form.updateRecord(r);
					r.dirty = true;
					var siteStore = Ext.data.StoreManager.get("Sites");
					siteStore.sync();
					siteStore.sort(siteStore.sorters);
					form.destroy();
					Ext.ComponentQuery.query("BodyList").map(function(list) {
						list.clearSites();
						list.drawSites(); 
					});
				}
			}
		]
	}
});