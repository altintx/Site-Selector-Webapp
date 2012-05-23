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
			'Geolocator': "geolocator"
		},
		control: {
			'Geolocator': {
				checkin: 'checkin'
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
			meals_store = Ext.data.StoreManager.get("Meals");

		meal.set({
			foursquare_id: venue.data.id,
			friendly_name: venue.data.name
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
	}
})