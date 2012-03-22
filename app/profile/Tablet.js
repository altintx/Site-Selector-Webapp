Ext.define('SiteSelector.profile.Tablet', {
	extend: 'Ext.app.Profile',
	requires: [
		'SiteSelector.view.phone.Main',
		'SiteSelector.view.tablet.Main'
	],
	config: {
		name: 'Tablet'
	},

	isActive: function() {
		return !Ext.os.is.Phone;
	},

	launch: function() {
		var $this = this;
		var defaultViewport = function(viewport) {
			viewport.removeAll(true);
			if (viewport.getOrientation() == "landscape")
				viewport.add(Ext.create('SiteSelector.view.tablet.Main')).show();
			else 
				viewport.add(Ext.create('SiteSelector.view.phone.Main')).show();
			
		};
		Ext.Viewport.on("orientationchange", function(viewport, orientation) {
			defaultViewport(viewport);
			return false;
		});
		defaultViewport(Ext.Viewport);
	}
});