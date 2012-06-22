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
			"SiteSelector.view.exercise.Edit",
			"SiteSelector.view.exercise.Still"
		]
	},
	
	show: function(navview) {
		var s_ex = Ext.data.StoreManager.get("Exercises");
		var s_my = Ext.create("Ext.data.Store", {
			model: "SiteSelector.model.Exercise",
			data: []
		});
		s_ex.each(function(r) {
			if (r.get("ended") == null) {
				s_my.add(r);
			}
		})
		if (s_my.getCount() > 0) {
			navview.push({
				xtype: "stillexercising",
				store: s_my,
				listeners: {
					edit: function(record) {
						navview.pop();
						navview.push({
							xtype: "editexercise",
							record: record,
							title: "Edit Exercise"
						});
					},
					"new": function(record) {
						var record = new SiteSelector.model.Exercise({
							when: new Date()
						});
						record.set({
							bgnow: Ext.data.StoreManager.get("BloodSugars").mostRecent(),
							cgmnow: Ext.data.StoreManager.get("BloodSugars").mostRecent()
						});
						navview.pop();
						navview.push({
							xtype: "addexercise",
							record: record,
							title: "Exercise"
						});
					}
					
				}
			});
		} else {
			var record = new SiteSelector.model.Exercise({
				when: new Date()
			});
			record.set({
				bgnow: Ext.data.StoreManager.get("BloodSugars").mostRecent(),
				cgmnow: Ext.data.StoreManager.get("BloodSugars").mostRecent()
			});
			navview.push({
				xtype: "addexercise",
				title: "Exercise",
				record: record
			});
		}
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