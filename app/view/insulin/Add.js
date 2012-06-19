Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.form.Panel",
	alias: "widget.addinsulin",
	config: {
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
					},
					{
						xtype: "container",
						layout: "hbox",
						items: [
							{
								xtype: "sliderfield",
								name: "duration",
								label: "Extended",
								minValue: 0,
								maxValue: 8,
								increment: 0.25,
								flex: 4
							},
							{
								xtype: "component",
								itemId: "time_display",
								flex: 1,
								html: "0:00"
							}
						]
					}
				],
				instruction: "If using an extended wave, for how long it is set"
			},
			{
				xtype: "fieldset",
				title: "Blood Sugar",
				items: [
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
			}
		]
	},
	
	constructor: function(config) {
		var $this = this,
			priors = config.priors;
		delete config.priors;
		if (!config.record) {
			config.record = new SiteSelector.model.Bolus();
		}
		this.callParent([config]);
		if (!priors) return;
		var form = this;
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
	
	initialize: function() {
		this.callParent(arguments);
		this.on("painted", function($this) {
			var tb = $this.up("navigationview").getNavigationBar();
			var done = tb.add({
				text: "Save",
				handler: function() {
					var view = Ext.Viewport.down("addinsulin");
					view.fireEvent("save", view);
					view.up("navigationview").pop();
				},
				align: "right"
			})
			$this.on("destroy", function() {
				done.destroy();
			});
			$this.on("hide", function() {
				done.hide();
			});
			$this.on("show", function() {
				done.show()
			});
			var sliderfield = $this.down("sliderfield[name=duration]");
			setTimeout(function() {
				var val = $this.getRecord().get("duration");
				sliderfield.up("container").down("#time_display").setHtml(Math.floor(val) + ":" + ("00" + (60 * (val-Math.floor(val)))).substr(-2))
				
				Ext.ComponentQuery.query("slider[baseCls=x-slider]")[0].on("drag", function(slider, thumb, values) {
					val = values[0];
					sliderfield.up("container").down("#time_display").setHtml(Math.floor(val) + ":" + ("00" + (60 * (val-Math.floor(val)))).substr(-2));
				});
			}, 100)
		}, 10);
	},
	
})