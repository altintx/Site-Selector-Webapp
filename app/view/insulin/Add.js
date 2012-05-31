Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.Panel",
	alias: "widget.addinsulin",
	config: {
		items: [
			{
				xtype: "titlebar",
				title: "Insulin",
				docked: "top",
				items: [
					{
						text: "Cancel",
						handler: function() {
							var view = this.up("addinsulin");
							view.fireEvent("cancel", view);
							view.hide();
							setTimeout(function() {
								view.destroy();
							}, 10);
						},
						align: "left"
					},
					{
						text: "Save",
						handler: function() {
							var view = this.up("addinsulin");
							view.fireEvent("save", view.down("formpanel"));
							view.hide();
							setTimeout(function() {
								view.destroy();
							}, 10);
						},
						align: "right"
					}
				]
			},
			{
				xtype: "formpanel",
				items: [
					{
						xtype: "fieldset",
						title: "Insulin",
						items: [
							{
								xtype: "container",
								layout: "hbox",
								defaults: {
									labelAlign: "top"
								},
								items: [
									{
										xtype: "spinnerfield",
										name: "normal",
										label: "Bolus",
										minValue: 0,
										maxValue: 50,
										increment: 0.1,
										cycle: false,
										flex: 1
									},
									{
										xtype: "spinnerfield",
										name: "wave",
										label: "Extended",
										minValue: 0,
										maxValue: 50,
										increment: 0.1,
										cycle: false,
										flex: 1
									}
								]
							}
						]
					}
				]
			}
		]
	},
	
	constructor: function(config) {
		var $this = this,
			priors = config.priors;
		delete config.priors;
		this.callParent([config]);
		var form = this.down("formpanel");
		form.setRecord(config.record);
		priors.sort(function(a, b) {
			var c = a.meal.data.when.getTime() - b.meal.data.when.getTime();
			if (c < 0) {
				return -1
			} else if (c > 0) {
				return 1;
			} else {
				return 0;
			}
		});
		priors.forEach(function(prior) {
			var when = prior.meal.get("when");
			if (prior.insulin && prior.blood_sugars.length > 1) // only show if we can get meaninful data
			form.add([{
				xtype: "container",
				layout: "hbox",
				items: [
					{
						xtype: "component",
						html: (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])[when.getMonth()] + " " + when.getDate() + ", " + when.getFullYear() + " " + (((prior.meal.get("when").getHours()-1)%12+1)||12) + ":" + (('0'+when.getMinutes()).substr(-2)) + ((when.getHours()>11)? 'PM': 'AM'),
						flex: 2
					},
					{
						xtype: "component",
						html: parseFloat(prior.insulin.data.normal || 0) + "U Bolus",
						flex: 1
					},
					{
						xtype: "component",
						html: parseFloat(prior.insulin.data.wave || 0) + "U Extended",
						flex: 1
					}
				]
			},
			{
				xtype: "component",
				layout: "fit",
				html: prior.blood_sugars.map(function(b) {
					return b.data.reading }
				).join(","),
				cls: "sparkline line"
			}]);
		});
		setTimeout(function() {
			jQuery(".sparkline.line").each(function(ix) { 
				$(this).html( $(this).contents().map(function() { 
					return $(this).html();
				}).get().join("")); 
			}).sparkline("html", {
				type: "line",
				width: '100%',
				height: "0.75in",
				fillColor: false,
			    normalRangeMin: 70,
				normalRangeMax: 180
			});
		}, 100);
	},
})