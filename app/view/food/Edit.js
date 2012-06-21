Ext.define("SiteSelector.view.food.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.editfood",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "image",
				src: "",
				name: "photo"
			},
			{
				xtype: "fieldset",
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
						label: "When",
						picker: {
							yearFrom: 2012,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
						}
					}),
					{
						xtype: "textfield",
						name: "friendly_location",
						label: "Ate At",
						readonly: true
					},
					{
						xtype: "textfield",
						name: "description",
						label: "Description"
					},
					{
						xtype: "numberfield",
						name: "carb_count",
						label: "Carbs"
					},
				]
			}
		]
	},
	
	initialize: function() {
		this.callParent();
		
		var $this = this;
		setTimeout(function() {
			var nv = $this.up("navigationview");
			var saveButton = nv.getNavigationBar().add({
				text: "Save",
				align: "right",
				handler: function() {
					$this.updateRecord($this.getRecord());
					$this.getRecord().dirty = true;
					Ext.data.StoreManager.get("Meals").sync();
					nv.pop();
				}
			});
			
			(function(photoRef, photoUri) {
				photoRef.setSrc(photoUri);
				if (photoUri) photoRef.element.addCls("captured");
			})($this.down("image[name=photo]"), $this.getRecord().get("file_uri"));
			
			$this.on("destroy", function() {
				saveButton.destroy();
			})
		});
	}
});