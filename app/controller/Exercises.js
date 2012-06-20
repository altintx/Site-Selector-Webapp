Ext.define("SiteSelector.controller.Exercises", {
	extend: "Ext.app.Controller",
	alias: "controller.exercises",
	config: {
		refs: {
			'addexercise': 'addexercise',
			'editexercise': 'editexercise',
			'navigationview': "navigationview"
		},
		control: {
			'addexercise': {
				add: "add"
			},
			'editexercise': {
				edit: "edit"
			},
			navigationview: {
				"list_exercises": "show"
			}
		},
		views: [
			"SiteSelector.view.exercise.Add",
			"SiteSelector.view.exercise.Edit"
		]
	},
	
	show: function(navview) {
		navview.push({
			xtype: "addexercise",
			title: "Exercise",
			record: new SiteSelector.model.Exercise({
				when: new Date()
			})
		})	
	},
	
	add: function($this) {
		var bgnowstore = Ext.data.StoreManager.get("BloodSugars");
		
		$this.updateRecord($this.getRecord());
		$this.getRecord().dirty = true;
		Ext.data.StoreManager.get("Exercises").add($this.getRecord());

		if ($this.getValues().use_cgmnow) {
			bgnowstore.add({
				when: $this.getRecord().get("when"),
				kind: "cgm",
				reading: $this.getValues().cgmnow,
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		if ($this.getValues().use_bgnow) {
			bgnowstore.add({
				when: $this.getRecord().get("when"),
				kind: "meter",
				reading: $this.getValues().bgnow,
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		bgnowstore.sync();
		Ext.data.StoreManager.get("Exercises").sync();
	},
	
	edit: function($this) {
		$this.updateRecord($this.getRecord());
		$this.getRecord().dirty = true;
		Ext.data.StoreManager.get("Exercises").sync();
	}
})