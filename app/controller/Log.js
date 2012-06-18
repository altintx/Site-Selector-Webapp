Ext.define("SiteSelector.controller.Log", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			Log: {
				itemtap: 'log_onItemTap',
				itemswipe: 'log_onItemSwipe'
			},
			Navigation: {
				showlog: "showlog"
			}
		},
		refs: {
			'Log': 'logviewer',
			'Navigation': "navigationview"
		}
	},
	
	log_onItemTap: function(list, ix, target, logrecord) {
		var record = logrecord.getOwner();
		var nv = Ext.Viewport.down("navigationview");
		var overlay;
		switch (logrecord.get("model")) {
			case "SiteSelector.model.Site":
				return nv.push({
					xtype: "SiteEdit",
					title: "Edit Site",
					record: record
				});
			case "SiteSelector.model.BloodSugar":
				return nv.push({
					xtype: "EditBloodSugar",
					title: "Edit Blood Sugar",
					record: record
				});
			case "SiteSelector.model.Food":
				return nv.push({
					xtype: "editfood",
					title: "Edit Meal",
					record: record
				});
			case "SiteSelector.model.Bolus":
				return nv.push({
					xtype: "editinsulin",
					title: "Edit Insulin",
					record: record
				});
			default:
				alert("I don't know what to do with " + logrecord.get("model"));
				return;
		}
		overlay.show();
	},
	
	log_onItemSwipe: function(dataview, ix, target, record, event, options) {
		if (event.direction == "left") {
			var del = Ext.create("Ext.Button", {
				ui: "decline",
				text: "Delete",
				style: "position:absolute;right:0.125in;",
				handler: function() {
					var owner = record.getOwner();
					var ownerStore = owner.stores[0];
					ownerStore.remove(owner);
					ownerStore.sync();
				}
			});
			var removeDeleteButton = function() {
				Ext.Anim.run(del, 'fade', {
					after: function() {
						del.destroy();
					},
					out: true
				});
			};
			
			del.renderTo(Ext.DomQuery.selectNode(".deleteplaceholder", target.dom));
			dataview.on({
				single: true,
				buffer: 250,
				itemtouchstart: removeDeleteButton
			});
			dataview.element.on({
				single: true,
				buffer: 250,
				touchstart: removeDeleteButton
			});
		}
	},
	
	showlog: function(view) {
		view.push({
			xtype: "logviewer",
			title: "Log"
		})
	}
})