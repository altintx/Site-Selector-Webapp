Ext.define("SiteSelector.view.exercise.Edit", {
	extend: "Ext.form.Panel",
	alias: "widget.editexercise",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "fieldset",
				instructions: "Duration in minutes, Carb Load in grams",
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
						label: "Occured",
						picker: {
							yearFrom: 2012,
							ampm : true,
							slotOrder: ['month', 'day', 'year','hour'] // append more fields depending on device type
						}
					}),
					{
						xtype: "textfield",
						name: "action",
						label: "Activity",
					},
					{
						xtype: "spinnerfield",
						name: "duration",
						label: "Duration",
						minValue: 0,
						maxValue: 480,
						increment: 5
					},
					{
						xtype: "spinnerfield",
						name: "carb_load",
						label: "Carb Load",
						minValue: 0,
						maxValue: 200,
						increment: 1
					}
				]
			}
		]
	},
	
	initialize: function() {
		var nv = Ext.Viewport.down("navigationview"), $this = this;
		setTimeout(function() {
			var save = nv.getNavigationBar().add({
				text: "Save",
				align: "right",
				handler: function() {
					$this.fireEvent("edit", $this);
					nv.pop();
				}
			})
			$this.on("destroy", function() {
				save.destroy();
			})
		}, 1);
	}
});