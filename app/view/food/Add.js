Ext.define("SiteSelector.view.food.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		title: "Eat Food",
		items: [
			{
				xtype: "fieldset",
				layout: "vbox",
				instructions: "Locations provided by FourSquare",
				items: [
					{
						xtype: "textfield",
						name: "description",
						label: false
					},
					{
						xtype: "numberfield",
						name: "carb_count",
						label: "Carbs"
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "selectfield",
								name: "foursquare_location",
								store: "Nearby",
								label: "Location",
								displayField: "name",
								valueField: "id",
								flex: 1
							},
							{
								xtype: "button",
								name: "repeat",
								text: "➶",
								handler: function(b) {
									(function(form) {
										form.fireEvent("repeat", form, form.down("selectfield[name=foursquare_location]").getValue(), form.getRecord());
									})(b.up("addfood"))
								}
							}
						]
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "togglefield",
								name: "use_bgnow",
								label: false,
								flex: 1,
								ui: "small"
							},
							{
								xtype: "spinnerfield",
								name: "bgnow",
								label: "#bgnow",
								labelCls: "transparent_label",
								labelWidth: "40%",
								minValue: 0,
								maxValue: 1000,
								increment: 1,
								cycle: false,
								flex: 3
							}
						]
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "togglefield",
								name: "use_cgmnow",
								label: false,
								flex: 1,
								ui: "small"
							},
							{
								xtype: "spinnerfield",
								name: "cgmnow",
								label: "#cgmnow",
								labelCls: "transparent_label",
								labelWidth: "40%",
								minValue: 0,
								maxValue: 1000,
								increment: 1,
								cycle: false,
								flex: 3
							}
						]
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Photo",
				hidden: !navigator.camera,
				items: [
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "image",
								src: false,
								flex: 1
							},
							{
								xtype: "button",
								iconCls: "compose",
								iconMask: true,
								handler: function(b) {
									var form = b.up("addfood");
									form.fireEvent("addPic", form.getRecord())
								},
								disabled: !navigator.camera
							}
						]
					},
				]
			}
		]					
	},
	
	constructor: function(config) {
		this.callParent([config]);
		var form = this;
		var list = this.down("selectfield[name=foursquare_location]");
		list.getStore().getNearbyRestaurants(function(store, nearest) {
			(function(record) {
				record.set({
					foursquare_id: nearest.get("id"),
					friendly_location: nearest.get("name")
				});
				list.setValue(nearest.get("id"));
			})(form.getRecord());
		});
		
		this.down("spinnerfield[name=bgnow]").setIncrement(SiteSelector.app.bgStep);
		this.down("spinnerfield[name=cgmnow]").setIncrement(SiteSelector.app.bgStep);
	},
	
	initialize: function() {
		this.callParent(arguments);
		var $this = this;
		setTimeout(function() {
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
				align: "right",
				text: "Done",
				handler: function() {
					(function(form, navigationview, record) {
						form.updateRecord(record);
						form.fireEvent("save", record);
						navigationview.pop();
						navigationview.fireEvent("insulinforfood", record, record.get("use_bgnow")? record.get("bgnow"): record.get("use_cgmnow")? record.get("cgmnow"): 0)
					})($this, $this.up("navigationview"), $this.getRecord());
				}
			})
			$this.on("destroy", function() {
				done.destroy();
			});
			$this.on("hide", function() {
				done.hide();
			});
			$this.on("show", function() {
				done.show()
			})
		}, 10);
	},

});