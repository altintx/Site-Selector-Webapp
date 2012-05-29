Ext.define("SiteSelector.controller.Food", {
	extend: "Ext.app.Controller",
	requires: ["SiteSelector.view.Geolocator"],
	config: {
		views: [
			"SiteSelector.view.food.Add",
			"SiteSelector.view.Geolocator",
			"SiteSelector.view.MealGallery"
		],
		models: [
			"Food",
			"Restaurant"
		],
		refs: {
			'Geolocator': "geolocator",
			"AddScreen": "addfood",
			"MealGallery": "meal_gallery"
		},
		control: {
			'Geolocator': {
				checkin: 'checkin'
			},
			'AddScreen': {
				save: 'savemeal'
			},
			"MealGallery": {
				skip: "collectFoodDetails",
				repeat: "collectFoodDetails"
			}
		}
	},
	
	add: function() {
		var meal = new SiteSelector.model.Food({
			when: new Date(),
			file_uri: "",
			description: "",
			friendly_location: "other"
		}),
		$this = this,
		getLocation = function(meal) {
			// get location
			var overlay = Ext.Viewport.add({
				xtype: "geolocator",
				width: "80%",
				height: "80%",
				meal: meal,					
				modal: true,
				hideOnMaskTap: true,
				centered: true
			});
			overlay.show();
		}
		if (navigator.camera) {
			navigator.camera.getPicture(function(imageURI) {
				meal.set("file_uri", imageURI);
				getLocation(meal);
			}, function(message) {
				getLocation();
			}, { 
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});			
		} else {
			getLocation(meal);
		}
	},
	
	checkin: function(view, venue, meal) {
		var meals_store = Ext.data.StoreManager.get("Meals"),
			blood_sugar = Ext.data.StoreManager.get("BloodSugars");

		meal.set({
			foursquare_id: venue.data.id,
			friendly_name: venue.data.name
		});
		
		meal.set({
			cgmnow: blood_sugar.mostRecent("cgm"),
			bgnow: blood_sugar.mostRecent("meter")
		});
		
		var prior_meals = meals_store.getMealsFromRestaurant(venue.data.id);
		
		if (prior_meals.getCount()) {
			Ext.Viewport.add({
				xtype: "meal_gallery",
				store: prior_meals,
				meal: meal,
				width: "80%",
				height: "80%",
				modal: true,
				hideOnMaskTap: true,
				centered: true
			}).show();
		} else {
			this.collectFoodDetails(meal);
		}
	},
	
	collectFoodDetails: function(meal) {
		Ext.Viewport.add({
			xtype: "addfood",
			width: "80%",
			layout: "fit",
			height: "80%",
			modal: true,
			hideOnMaskTap: true,
			centered: true,
			record: meal
		}).show();
	},
	
	savemeal: function(values, meal) {
		var meal_store = Ext.data.StoreManager.get("Meals"),
			blood_sugar = 0,
			bgnow_store = Ext.data.StoreManager.get("BloodSugars");
		
		meal.set({
			description: values.description,
			carb_count: values.carb_count
		});
		
		if (values.use_cgmnow) {
			bgnow_store.add({
				when: meal.get("when"),
				kind: "cgm",
				reading: values.cgmnow
			});
			blood_sugar = values.bgnow
		}
		
		if (values.use_bgnow) {
			bgnow_store.add({
				when: meal.get("when"),
				kind: "meter",
				reading: values.bgnow
			});
			blood_sugar = values.bgnow
		} else {
			blood_sugar = 0;
		}
		meal_store.add(meal);
		meal_store.sync();
		
		this.showPastTrends(meal, blood_sugar);
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
		overlay = Ext.Viewport.add({
			xtype: "panel",
			width: "80%",
			layout: "fit",
			height: "80%",
			items: [
				{
					xtype: "addinsulin",
					record: insulin,
					priors: prior_consumption.map(function(m) { 
						return m.getAffected() 
					})
				}
			],
			modal: true,
			hideOnMaskTap: true,
			centered: true
		});
		
	}
})