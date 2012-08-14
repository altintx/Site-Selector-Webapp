Ext.define("SiteSelector.controller.Log", {
	extend: "Ext.app.Controller",
	config: {
		control: {
			Log: {
				itemtap: 'log_onItemTap',
				itemswipe: 'log_onItemSwipe'
			}
		},
		refs: {
			'Log': 'LogViewer',
			'menu': 'LogActionSheet'
		}
	},
	
	log_onItemTap: function(list, ix, target, logrecord) {
		var record = logrecord.getOwner();
		var overlay = Ext.Viewport.add({
			xtype: "SiteEdit",
			record: record,
			listeners: {
				hide: function() {
					overlay.destroy();
				}
			}
		});
		overlay.show();
	},
	
	addLogEvent_onTap: function(button, event) {
		this.menu = Ext.create('SiteSelector.view.LogActionSheet');
		Ext.Viewport.add(this.menu);
		this.menu.show();
	},
	
	log_onItemSwipe: function(dataview, ix, target, record, event, options) {
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
})