Ext.define("SiteSelector.controller.Food", {
	extend: "Ext.app.Controller",
	requires: ["SiteSelector.view.Geolocator"],
	config: {
		views: [
			"SiteSelector.view.food.Add",
			"SiteSelector.view.Geolocator"
		],
		models: [
			"Food",
			"Restaurant"
		],
		refs: {
			'Geolocator': "geolocator",
			"AddScreen": "addfood"
		},
		control: {
			'Geolocator': {
				checkin: 'checkin'
			},
			'AddScreen': {
				save: 'showPastTrends'
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
				xtype: "panel",
				width: "80%",
				layout: "fit",
				height: "80%",
				items: [
					{
						xtype: "geolocator",
						meal: meal						
					}
				],
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
		var overlay = null,
			meals_store = Ext.data.StoreManager.get("Meals"),
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
			overlay = Ext.Viewport.add({
				xtype: "panel",
				width: "80%",
				layout: "fit",
				height: "80%",
				items: [
					{
						xtype: "meal_gallery",
						store: prior_meals
					}
				],
				modal: true,
				hideOnMaskTap: true,
				centered: true
			});
		} else {
			overlay = Ext.Viewport.add({
				xtype: "addfood",
				width: "80%",
				layout: "fit",
				height: "80%",
				modal: true,
				hideOnMaskTap: true,
				centered: true,
				record: meal
			});
		}
		
		overlay.show();
		
		setTimeout(function() { view.up("panel").destroy(); }, 1);
	},
	
	showPastTrends: function(values, meal) {
		var meal_store = Ext.data.StoreManager.get("Meals"), overlay = null;
		meal.set({
			description: values.description
		});
		
		var prior_consumption = meal_store.getLikeRecords({
			friendly_location: meal.get("friendly_location"),
			description: meal.get("description")
		});
		
		var settings = SiteSelector.app.settings();
		var insulin = new SiteSelector.model.Bolus({
			blood_sugar: values.blood_sugar,
			carbs: values.carb_count,
			normal: (values.blood_sugar - settings.get("target_bg")) / settings.get("correction_factor") +
				values.carb_count / settings.get("carb_ratio"),
			wave: 0
		});
		
		overlay = Ext.Viewport.add({
			xtype: "panel",
			width: "80%",
			layout: "fit",
			height: "80%",
			items: [
				{
					xtype: "addinsulin",
					record: insulin,
					priors: prior_consumption.map(function(m) { return m.getEffected() })
				}
			],
			modal: true,
			hideOnMaskTap: true,
			centered: true
		});
		
	}
})