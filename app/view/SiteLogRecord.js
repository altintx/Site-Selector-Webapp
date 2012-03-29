Ext.define("SiteSelector.view.SiteLogRecord", {
	extend: 'Ext.dataview.component.DataItem',
	requires: ["Ext.Container"],
	xtype: "sitelogrecord",
	config: {
		type: {
			flex: 1
		},
		when: {
			flex: 1
		},
		removed: {
			flex: 1
		},
		location: {
			flex: 2
		},
		layout: {
			type: "hbox"
		},
		dataMap: {
			getType: {
				setHtml: "kind"
			},
			getWhen: {
				setDate: "when"
			},
			getRemoved: {
				setDate: "removed"
			},
			getLocation: {
				setHtml: "location"
			}
		}
	},
	
	applyType: function (config) {
		var w = Ext.factory(config, Ext.Panel, this.getType());
		var oldSetHtml = w.setHtml;
		w.setHtml = function(html) {
			var arg = html;
			switch (html) {
				case "pump":
					arg = "Pump";
					break;
				case "cgm":
					arg = "CGMS";
					break;
			}
			oldSetHtml.call(w, arg);
		}
		return w;
	},
	
	updateType: function (newType, oldType) {
		if (newType) {
			this.add(newType);
		}
		if (oldType) {
			this.remove(oldType);
		}
	},
	
	applyLocation: function (config) {
		return Ext.factory(config, Ext.Panel, this.getLocation());
	},
	
	updateLocation: function (newSide, oldSide) {
		if (newSide) {
			this.add(newSide);
		}
		if (oldSide) {
			this.remove(oldSide);
		}
	},
	
	applyWhen: function (config) {
		var w = Ext.factory(config, Ext.Panel, this.getWhen());
		w.setDate = function(v) {
			var m = (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"])[v.getMonth()],
			    d = v.getDate(), 
			    y = v.getFullYear();
			this.setHtml(m + " " + d + ", " + y);
		}
		return w;
	},
	
	applyRemoved: function (config) {
		var w = Ext.factory(config, Ext.Panel, this.getRemoved());
		w.setDate = function(v) {
			if (v) {
				var m = (["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"])[v.getMonth()],
				    d = v.getDate(), 
				    y = v.getFullYear();
				this.setHtml(m + " " + d + ", " + y);
			} else {
				this.setHtml("");
			}
		}
		return w;
	},	
	updateWhen: function (newWhen, oldWhen) {
		if (newWhen) {
			this.add(newWhen);
		}
		if (oldWhen) {
			this.remove(oldWhen);
		}
	},
	updateRemoved: function (newWhen, oldWhen) {
		if (newWhen) {
			this.add(newWhen);
		}
		if (oldWhen) {
			this.remove(oldWhen);
		}
	}
})