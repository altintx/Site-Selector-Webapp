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
				oauth_token: "JH1LE0RJHQ1LLNHHIFN4RVBJEDM1YVS05FHCQET33LQLTWAE",
				v: 20120521,
				intent: "browse",
				radius: 2000
		    },
			reader: {
				type: "json",
				rootProperty: "response.venues"
			},
			model: "SiteSelector.model.FoursquareVenue",
			url : 'https://api.foursquare.com/v2/venues/search',
		},
		model: 'SiteSelector.model.FoursquareVenue',
	},
	
	getNearby: function() {
		var store = this;
		var onSuccess = function(position) {
			store.getProxy().getExtraParams().ll = [position.coords.latitude,position.coords.longitude].join(",");
			store.load(function(records) {
				records.forEach(function(r) {
					r.set("distance", r.raw.location.distance);
				});
				store.add({
					name: "Homemade",
					id: "homemade-11111111",
					location: {
						longitude: position.coords.longitude,
						latitude:  position.coords.latitude,
						distance: 0						
					},
					distance: 0						
				});
				store.add({
					name: "Other",
					id: "other-11111111",
					location: {
						longitude: position.coords.longitude,
						latitude:  position.coords.latitude,
						distance: 0
					},
					distance: 0	
				});
			});
		};
		
		navigator.geolocation.getCurrentPosition(onSuccess, function() {
			console.log("Fail"); 
		});	
	}
})