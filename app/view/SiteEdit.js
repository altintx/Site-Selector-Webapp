Ext.define("SiteSelector.view.SiteEdit", {
	extend: "Ext.form.Panel",
	alias: "widget.SiteEdit",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "component",
				tpl: new Ext.XTemplate('<div style="overflow-y:hidden;height:0.65in;margin-right:0.1in;"><div class="body-thumbnail-{side}" style="top:-{y*3.3}%;"><div class="circle site {kind}" style="' + 
				'left:{x}%;' +
				'top:{y}%;' +
				'margin-left:-0.125in;' +
				'margin-top:-0.125in;' +
				'">+</div></div></div>')
			},
			{
				xtype: "fieldset",
				defaults: {
					labelWidth: "35%"
				},
				items: [
					(function(config) {
						if (Ext.os.is.Phone) {
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y gA';
						} else {
							config.picker.slotOrder.push("minute");
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y h:i:A';
						}
						return config;
					})({
						xtype: 'datetimepickerfield',
						name : 'when',
						label: "Placed",
						picker: {
							yearFrom: 2012,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
						}
					}),
					(function(config) {
						if (Ext.os.is.Phone) {
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y gA';
						} else {
							config.picker.slotOrder.push("minute");
							config.picker.slotOrder.push("ampm");
							config.dateTimeFormat = 'm/d/Y h:i:A';
						}
						return config;
					})({
						xtype: 'datetimepickerfield',
						name : 'removed',
						label: "Removed",
						picker: {
							yearFrom: 2012,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour']
						}
					}),
					{
						xtype: "selectfield",
						name: "kind",
						label: "Kind",
						options: [
							{
								text: "Pump",
								value: "pump"
							},
							{
								text: "CGMS",
								value: "cgm"
							},
							{
								text: "Shot (Bolus)",
								value: "shot_bolus"
							},
							{
								text: "Shot (Basal)",
								value: "shot_basal"
							}
						]
					},
					{
						xtype: "selectfield",
						name: "orientation",
						label: (function(phone) {
							if (phone) {
								return "Orient";
							} else {
								return "Orientation";
							}
						})(Ext.os.is.Phone),
						options: [
							{
								text: "+ Default",
								value: "+"
							},
							{
								text: "↑ Up",
								value: "↑"
							},
							{
								text: "↓ Down",
								value: "↓"
							},
							{
								text: "← Left",
								value: "←"
							},
							{
								text: "→ Right",
								value: "→"
							}
						]
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
							var form = $this.up("formpanel");
							var store = Ext.data.StoreManager.get("Sites");
							store.remove(form.getRecord());
							store.sync();
							$this.up("navigationview").pop();
						}
					});
				}
			}
		]
	},
	
	constructor: function(config) {
		var site = Ext.clone(config.record.data);
		site.x *= 100;
		site.y *= 100;
		this.config.items[0].data = site;
		this.callParent(arguments)
	},
	
	initialize: function() {
		this.callParent();
		var $this = this;
		setTimeout(function (args) {
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
				align: "right",
				text: "Save",
				handler: function() {
					// save
					var form = $this;
					var r = form.getRecord();
					form.updateRecord(r);
					r.dirty = true;
					var siteStore = Ext.data.StoreManager.get("Sites");
					if (["shot_bolus", "shot_basal"].indexOf(r.data.kind) > -1) {
						r.set("removed", r.get("when"));
					}
					siteStore.sync();
					siteStore.sort(siteStore.sorters);
					Ext.Viewport.down("navigationview").pop();
				}
			})
			$this.on("destroy", function() {
				done.destroy();
			});
		}, 1)
	}
});