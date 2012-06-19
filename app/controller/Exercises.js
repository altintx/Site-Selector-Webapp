Ext.define("SiteSelector.controller.Exercises", {
	extend: "Ext.app.Controller",
	alias: "controller.exercises",
	config: {
		refs: {
			'addexercise': 'addexercise',
			'editexercise': 'editexercise'
		},
		control: {
			'addexercise': {
				add: "add"
			},
			'editexercise': {
				edit: "edit"
			}
		},
		views: [
			"SiteSelector.view.exercise.Add",
			"SiteSelector.view.exercise.Edit"
		]
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