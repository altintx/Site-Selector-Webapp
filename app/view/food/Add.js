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
						label: false,
						placeHolder: "Description"
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
						xtype: "bloodsugar",
						name: "bgnow",
						label: "Meter",
					},
					{
						xtype: "bloodsugar",
						name: "cgmnow",
						label: "CGM",
						subordinateTo: "bloodsugar[name=bgnow]"
					}
				]
			},
			{
				xtype: "fieldset",
				title: "Photo",
				items: [
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "image",
								src: false,
								name: "photo",
								flex: 1
							},
							{
								xtype: "button",
								iconCls: "compose",
								iconMask: true,
								handler: function(b) {
									if (navigator.camera) {
										var form = b.up("addfood");
										form.fireEvent("addPic", form.getRecord(), function(uri) {
											(function(photo) {
												photo.setSrc(uri);
												if (!photo.element.hasCls("captured")) photo.element.addCls("captured");
											})(form.down("image[name=photo]"));
										})
									} else {
										Ext.Msg.alert("No Camera");
									}
								}
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
			if (typeof nearest == "undefined") return;
			(function(record) {
				record.set({
					foursquare_id: nearest.get("id"),
					friendly_location: nearest.get("name")
				});
				list.setValue(nearest.get("id"));
			})(form.getRecord());
		});
	},
	
	initialize: function() {
		this.callParent(arguments);
		this.on("painted", function($this) {
			$this.up("navigationview").on("back", function(nv) {
				$this.hide();
			}, true);
			
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
				align: "right",
				text: "Done",
				handler: function() {
					(function(form, navigationview, record) {
						form.updateRecord(record);
						form.fireEvent("save", record, form);
						navigationview.pop();
						navigationview.fireEvent("insulinforfood", record, form.getValues.use_bgnow? form.getValues().bgnow: form.getValues().use_cgmnow? form.getValues().cgmnow: 0)
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
		});
	},

});