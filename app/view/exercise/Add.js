Ext.define("SiteSelector.view.exercise.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addexercise",
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
						name : 'ended',
						label: "Ended",
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
					// {
					// 	xtype: "spinnerfield",
					// 	name: "duration",
					// 	label: "Duration",
					// 	minValue: 0,
					// 	maxValue: 480,
					// 	increment: 5
					// },
					{
						xtype: "spinnerfield",
						name: "carb_load",
						label: "Carb Load",
						minValue: 0,
						maxValue: 200,
						increment: 1
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
	
	initialize: function() {
		var nv = Ext.Viewport.down("navigationview");
		this.on("painted", function($this) { 
			nv.on("back", function(nv) {
				$this.hide();
			}, true);
			
			var save = nv.getNavigationBar().add({
				text: "Save",
				align: "right",
				handler: function() {
					$this.fireEvent("add", $this);
					nv.pop();
				}
			})
			$this.on("destroy", function() {
				save.destroy();
			})
			$this.on("hide", function() {
				save.hide();
			})
			$this.on("show", function() {
				save.show();
			})
		});
	}
});