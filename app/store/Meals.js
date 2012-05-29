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
		],
		listeners: {
			beforesync: 'onBeforeSync'
		}
	},
	
	onBeforeSync: function (store) {
		var field;
		var logStore = Ext.data.StoreManager.get("Logs");
		store.getUpdatedRecords().forEach(function(m) {
			var ix = logStore.findBy(function(r) {
				return (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Food");
			})
			var r = logStore.getAt(ix);
			r.set({
				description: m.data.description
			});
		});
		store.getNewRecords().forEach(function(m) {
			logStore.record(m, "Ate", m.get("description"));
		});
		store.getRemovedRecords().forEach(function(m) {
			logStore.each(function(r) {
				if (r.get("fk") == m.getId() && r.get("model") == "SiteSelector.model.Food") {
					console.log("removing", r);
					logStore.remove(r);
				}
			});
		});
		logStore.sync();			
	},
		
	getMealsFromRestaurant: function(foursquare_id) {
		var last_meals = Ext.create("Ext.data.Store", {
			model: "SiteSelector.model.Food"
		});
		this.each(function(meal) {
			var present = false;
			last_meals.each(function(prior_meal) {
				present |= (meal.data.foursquare_id == foursquare_id && meal.data.description == prior_meal.data.description);
			})
			if (!present) { // isn't in the last_meals list
				last_meals.add(meal);
				if (last_meals.length == 10) return false;
			}
		}, this);
		return last_meals;
	},
	
	getLikeRecords: function(filters) {
		var past_meals = [
		];

		this.each(function(meal) {
			var add = true;
			for (key in filters) {
				add = add & (meal.data[key] == filters[key]);
			}
			if (add) {
				past_meals.push(meal);
			}
		})
		
		return past_meals;
	}
});