Ext.define("SiteSelector.controller.Food", {
	extend: "Ext.app.Controller",
	requires: ["SiteSelector.view.Geolocator"],
	config: {
		views: [
			"SiteSelector.view.food.Add"
		],
		models: [
			"Food",
			"Restaurant"
		]
	},
	
	add: function() {
		var meal = new SiteSelector.model.Food({
			when: new Date(),
			file_uri: "",
			description: "",
			longitude: 0,
			latitude: 0,
			friendly_location: "other"
		}),
		$this = this,
		getLocation = function() {
			// get location
			var overlay = Ext.Viewport.add({
				xtype: "panel",
				width: "80%",
				layout: "fit",
				height: "80%",
				items: [
					{
						xtype: "geolocator"
					}
				],
				modal: true,
				hideOnMaskTap: true,
				centered: true,
				listeners: {
					hide: function() {
						overlay.destroy();
					}
				}
			});
			overlay.show();
		}
		if (false && navigator.camera) {
			navigator.camera.getPicture(function(imageURI) {
				meal.set("file_uri", imageURI);
				getLocation();
			}, function(message) {
				getLocation();
			}, { 
				quality: 50,
				destinationType: Camera.DestinationType.FILE_URI
			});			
		} else {
			getLocation();
		}
	}
})