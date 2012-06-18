Ext.define("SiteSelector.view.bloodsugar.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.EditBloodSugar",
	requires: ['Ext.field.DatePicker', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "fieldset",
				items: [
					{
						xtype: "selectfield",
						name: "kind",
						label: "From",
						options: [
							{
								text: "Meter",
								value: "meter"
							},
							{
								text: "CGM",
								value: "cgm"
							}
						]
					},
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
					{
						xtype: "spinnerfield",
						name: "reading",
						label: "Reading",
						minValue: 0,
						maxValue: 1000,
						cycle: false
					}
				]
			}
		]
	},

	constructor: function(config) {
		this.callParent([config]);
		this.down("spinnerfield[name=reading]").setIncrement(SiteSelector.app.bgStep);
		var nv = Ext.Viewport.down("navigationview"), $this = this;
		setTimeout(function() {
			var save = nv.getNavigationBar().add({
				text: "Save",
				align: "right",
				handler: function() {
					$this.updateRecord($this.getRecord());
					$this.getRecord().dirty = true;
					Ext.data.StoreManager.get("BloodSugars").sync();
					nv.pop();
				}
			})
			$this.on("destroy", function() {
				save.destroy();
			})
		}, 1)
	}
});