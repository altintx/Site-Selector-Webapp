Ext.define("SiteSelector.view.insulin.Add", {
	extend: "Ext.form.Panel",
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
							view.fireEvent("save", view);
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
				xtype: "fieldset",
				title: "Bolus",
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
								label: "Normal",
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
	},
	
	constructor: function(config) {
		var $this = this,
			priors = config.priors;
		delete config.priors;
		this.callParent([config]);
		debugger;
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
		debugger;
		priors.forEach(function(prior) {
			var when = prior.meal.get("when");
			$this.add({
				xtype: "container",
				layout: "hbox",
				height: "1in",
				items: [
					{
						xtype: "component",
						html: (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])[when.getMonth()] + " " + when.getDate() + ", " + when.getFullYear() + "<br />" + 
							(((prior.meal.get("when").getHours()-1)%12+1)||12) + ":" + (('0'+when.getMinutes()).substr(-2)) + ((when.getHours()>11)? 'PM': 'AM') + "<br />" +
							parseFloat(prior.bolus || 0) + "U / " + parseFloat(prior.wave || 0) + "U",
						flex: 1
					},
					{
						xtype: "component",
						html: prior.blood_sugars.map(function(b) { return b.data.reading }).join(","),
						cls: "sparkline line"
					}
				]
			});
		});
		setTimeout(function() {
			jQuery(".sparkline.line").each(function(ix) { 
				$(this).html( $(this).contents().map(function() { 
					return $(this).html();
				}).get().join("")); 
			}).sparkline("html", {
				type: "line",
				width: '2.5in',
				height: "0.75in",
				fillColor: false,
			    normalRangeMin: 70,
				normalRangeMax: 180
			});
		}, 100);
	},
})