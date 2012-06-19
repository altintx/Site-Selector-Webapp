Ext.define("SiteSelector.view.exercise.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addexercise",
	requires: ['Ext.field.Spinner', 'Ext.field.Select', 'Ext.ux.field.DateTimePicker', 'Ext.field.Toggle'],
	config: {
		items: [
			{
				xtype: "fieldset",
				instructions: "Duration in minutes",
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
			}		]
	},
	
	initialize: function() {
		var nv = Ext.Viewport.down("navigationview"), $this = this;
		setTimeout(function() {
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
		}, 1);
	}
});