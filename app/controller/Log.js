Ext.define("SiteSelector.controller.Log", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			Log: {
				itemtap: 'log_onItemTap',
				itemswipe: 'log_onItemSwipe'
			},
			AddLog: {
				tap: 'addLogEvent_onTap'
			},
			AddEvent: {
				tap: "addEvent_onTap"
			}
		},
		refs: {
			'Log': 'LogViewer',
			'AddLog': 'LogViewer button[action=addevent]',
			'AddEvent': 'LogActionSheet button'
		}
	},
	
	log_onItemTap: function(list, ix, target, logrecord) {
		var record = logrecord.getOwner();
		var overlay;
		switch (logrecord.get("model")) {
			case "SiteSelector.model.Site":
				overlay = Ext.Viewport.add({
					xtype: "SiteEdit",
					modal: true,
					hideOnMaskTap: true,
					record: record,
					showAnimation: {
						type: "popIn",
						duration: 250,
						easing: "ease-out"
					},
					hideAnimation: {
						type: "popOut",
						duration: 250,
						easing: "ease-out"
					},
					centered: true,
					scrollable: true,
					width: Ext.Viewport.windowWidth * 0.8,
					height: Ext.Viewport.windowHeight * 0.8,
					listeners: {
						hide: function() {
							overlay.destroy();
						}
					}
				});
				break;
			case "SiteSelector.model.BloodSugar":
				overlay = Ext.Viewport.add({
					xtype: "EditBloodSugar",
					modal: true,
					hideOnMaskTap: true,
					record: record,
					showAnimation: {
						type: "popIn",
						duration: 250,
						easing: "ease-out"
					},
					hideAnimation: {
						type: "popOut",
						duration: 250,
						easing: "ease-out"
					},
					centered: true,
					scrollable: true,
					width: Ext.Viewport.windowWidth * 0.8,
					height: Ext.Viewport.windowHeight * 0.8,
					listeners: {
						hide: function() {
							overlay.destroy();
						}
					}
				});
				break;
			default:
				alert("I don't know what to do with " + logrecord.get("model"));
				return;
		}
		overlay.show();
	},
	
	addLogEvent_onTap: function(button, event) {
		this.menu = Ext.create('SiteSelector.view.LogActionSheet');
		Ext.Viewport.add(this.menu);
		this.menu.show();
	},
	
	addEvent_onTap: function (button, event) {
		console.log(button);
		this.menu.destroy();

		switch (button.alias) {
			case "addfood":
			case "addinsulin":
			case "addexercise":
			case "addsick":
				alert("Still working on it. Patience.");
				break;
			case "addbgnow":
				overlay = Ext.Viewport.add({
					xtype: "AddBloodSugar",
					modal: true,
					record: new SiteSelector.model.BloodSugar({
						when: new Date()
					}),
					hideOnMaskTap: true,
					showAnimation: {
						type: "popIn",
						duration: 250,
						easing: "ease-out"
					},
					hideAnimation: {
						type: "popOut",
						duration: 250,
						easing: "ease-out"
					},
					centered: true,
					scrollable: true,
					width: Ext.Viewport.windowWidth * 0.8,
					height: Ext.Viewport.windowHeight * 0.8,
					listeners: {
						hide: function() {
							overlay.destroy();
						}
					}
				});
				
		}
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
	}
})