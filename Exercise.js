Ext.define("SiteSelector.controller.Exercise", {
	extend: "Ext.app.Controller",
	alias: "controller.exercise",
	config: {
		views: [
			"SiteSelector.view.exercise.Add",
			"SiteSelector.view.exercise.Edit"
		],
		refs: {
			"addexercise": "addexercise",
			"editexercise": "editexercise"
		},
		control: {
			"addexercise": {
				save: "doAdd"
			},
			"editexercise": {
				save: "doEdit"
			}
		}
	},
	
	doAdd: function(form) {
		var exercises = Ext.data.StoreManager.get("Exercises");
		var exercise = form.getRecord();
		form.updateRecord(exercise);
		exercise.dirty = true;
		exercises.add(exercise);
		exercises.sync();
	},
	
	doEdit: function(form) {
		var exercises = Ext.data.StoreManager.get("Exercises");
		var exercise = form.getRecord();
		form.updateRecord(exercise);
		exercise.dirty = true;
		exercises.sync();
	}
});