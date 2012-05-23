Ext.define("SiteSelector.store.Meals", {
	extend: "Ext.data.Store",
	requires: ["SiteSelector.model.Food", "Ext.data.proxy.LocalStorage"],
	alias: "store.Meals",
	config: {
		model: "SiteSelector.model.Food",
		autoLoad: true,
	    proxy: {
	        type: 'localstorage',
	        id: 'rotator-app-store-meals',
	    },
		sorters: [
			{
				sorterFn: function(a,b) {
					return a.data.when.getTime() > b.data.when.getTime();
				}
			}
		]
	},
	
	getMealsFromRestaurant: function(foursquare_id) {
		var last_meals = Ext.create("Ext.data.Store", {
			model: "SiteSelector.model.Food"
		});
		this.each(function(meal) {
			if (!last_meals.some(function(prior_meal) {
				return (meal.data.foursquare_id == foursquare_id && meal.data.description == prior_meal.data.description);
			})) { // isn't in the last_meals list
				last_meals.add(meal);
				if (last_meals.length == 10) return false;
			}
		}, this);
		return last_meals;
	}
});