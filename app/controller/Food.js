Ext.define("SiteSelector.controller.Food", {
	extend: "Ext.app.Controller",
	requires: ["SiteSelector.view.Geolocator"],
	config: {
		views: [
			"SiteSelector.view.food.Add",
			"SiteSelector.view.food.Edit"
			// "SiteSelector.view.Geolocator",
			// "SiteSelector.view.MealGallery"
		],
		models: [
			"Food",
			"Restaurant"
		],
		refs: {
			// 'Geolocator': "geolocator",
			"AddScreen": "addfood",
			"MealGallery": "meal_gallery",
			"Homescreen": "navigationview"
		},
		control: {
			'AddScreen': {
				save: 'savemeal',
				addPic: "addPic",
				repeat: 'checkin',
			},
			"MealGallery": {
				reusemealtemplate: "collectFoodDetails"
			},
			"Homescreen": {
				eat: "add",
				insulinforfood: "showPastTrends"
			}
		}
	},
	
	persistPhoto: function(imageURI, callback) {
		window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs) {
			window.resolveLocalFileSystemURI(imageURI, function(fe) {
				fe.moveTo(fs.root, "meal-" + Date.now() + ".jpg", function(f) {
					callback(f.toURL())
				}, function(error) {
					// fail
				});
				
			}, function (e) {
				
			});
		}, function(event) {
			// fail
		});
	},
	
	add: function(navigation_view) {
		var meal = new SiteSelector.model.Food({
	    	when: new Date(),
	    	file_uri: "",
	    	description: "",
	    	friendly_location: "other",
	    });
		meal.set({
			bgnow: Ext.data.StoreManager.get("BloodSugars").mostRecent(),
	    	cgmnow: Ext.data.StoreManager.get("BloodSugars").mostRecent()
		})
		navigation_view.push({
			xtype: "addfood",
			record: meal
		});
	},
	
	addPic: function(meal) {
		if (navigator.camera) {
			navigator.camera.getPicture(function(temporaryImageURI) {
				$this.persistPhoto(temporaryImageURI, function(persistentURL) {
					meal.set("file_uri", persistentURL);
				});
			}, function(message) {
				Ext.Msg.alert("Failed to save the photo", message)
				getLocation();
			}, { 
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});
		} else {
			Ext.Msg.alert("Couldn't access the camera")
		}
	},
	
	checkin: function(view, venue_id, meal) {
		var meals_store = Ext.data.StoreManager.get("Meals"),
		    blood_sugar = Ext.data.StoreManager.get("BloodSugars");
		
		var prior_meals = meals_store.getMealsFromRestaurant(venue_id);
		
		if (prior_meals.getCount()) {
			view.up("navigationview").push({
				xtype: "meal_gallery",
				store: prior_meals,
				meal: meal,
				hideOnMaskTap: true,
				title: meal.get("friendly_location")
			})
		} else {
			Ext.Msg.alert(meal.get("friendly_location"), "There are no previously logged meals from " + meal.get("friendly_location"));
		}
	},
	
	collectFoodDetails: function(prior_meal, current_meal) {
		current_meal.set({
			description: prior_meal.get("description"),
			carb_count: prior_meal.get("carb_count"),
		})
		if (!current_meal.get("file_uri")) {
			current_meal.set("file_uri", prior_meal.get("file_uri"));
		}
		Ext.Viewport.down("addfood").setRecord(current_meal);
	},
	
	savemeal: function(meal) {
		var meal_store = Ext.data.StoreManager.get("Meals"),
			bgnow_store = Ext.data.StoreManager.get("BloodSugars");
		
		if (meal.get("use_cgmnow")) {
			bgnow_store.add({
				when: meal.get("when"),
				kind: "cgm",
				reading: meal.get("cgmnow"),
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		if (meal.get("use_bgnow")) {
			bgnow_store.add({
				when: meal.get("when"),
				kind: "meter",
				reading: meal.get("bgnow"),
				unit: SiteSelector.app.settings("bgunit")
			});
		}
		
		bgnow_store.sync();
		
		meal_store.add(meal);
		meal_store.sync();
	},
	
	showPastTrends: function(meal, blood_sugar) {
		var meal_store = Ext.data.StoreManager.get("Meals"), overlay = null;
		var prior_consumption = meal_store.getLikeRecords({
			friendly_location: meal.get("friendly_location"),
			description: meal.get("description")
		});
		
		var settings = SiteSelector.app.settings();
		var insulin;
		if (blood_sugar > 0) {
			insulin = new SiteSelector.model.Bolus({
				blood_sugar: blood_sugar,
				carbs: meal.get("carb_count"),
				normal: (blood_sugar - settings.get("target_bg")) / settings.get("correction_factor") +
					meal.get("carb_count") / settings.get("carb_ratio"),
				wave: 0
			});
		} else {
			insulin = new SiteSelector.model.Bolus({
				blood_sugar: null,
				carbs: meal.get("carb_count"),
				normal: meal.get("carb_count") / settings.get("carb_ratio"),
				wave: 0
			});
		}
		
		Ext.Viewport.down("navigationview").push({
			xtype: "addinsulin",
			record: insulin,
			title: "Insulin for Food",
			priors: prior_consumption.map(function(m) { 
				return m.getAffected() 
			})
		});
	}
})