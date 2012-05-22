Ext.define("SiteSelector.store.Nearby", {	
	alias: "store.nearby",
	extend: 'Ext.data.Store',
	requires: ["SiteSelector.model.FoursquareVenue", "Ext.data.proxy.JsonP"],
	config: {
		sorters: [
			{
				property: "distance",
				direction: "ASC"
			}
		],
		proxy: {
			type: 'jsonp',
			extraParams: {
				ll: "",
				oauth_token: "",
				v: 20120521,
				intent: "browse",
				radius: 20000
		    },
			reader: {
				type: "json",
				rootProperty: "response.venues"
			},
			model: "SiteSelector.model.FoursquareVenue",
			url : 'https://api.foursquare.com/v2/venues/search',
		},
		model: 'SiteSelector.model.Restaurant',
	},
	
	getNearby: function() {
		var store = this;
		store.removeAll();
		var onSuccess = function(position) {
			store.add({
				name: "Homemade",
				friendly_location: "Homemade",
				longitude: position.coords.longitude,
				latitude:  position.coords.latitude,
				foursquare_id: null,
				distance: 0
			});
			store.add({
				name: "Other",
				friendly_location: "Other",
				longitude: position.coords.longitude,
				latitude:  position.coords.latitude,
				foursquare_id: null,
				distance: 0
			});
			store.getProxy().getExtraParams().ll = [position.coords.latitude,position.coords.longitude].join(",");
			store.load();
		};
		
		navigator.geolocation.getCurrentPosition(onSuccess, function() { console.log("Fail"); });	
	}
})