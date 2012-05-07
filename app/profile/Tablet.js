Ext.define('SiteSelector.profile.Tablet', {
	extend: 'Ext.app.Profile',
	config: {
		name: 'Tablet',
		views: ["Main"]
	},

	isActive: function() {
		return !Ext.os.is.Phone;
	},

	launch: function() {
		var $this = this;
		var defaultViewport = function(viewport) {
			var main = null;
			viewport.removeAll(true);
			if (viewport.getOrientation() == "landscape") {
				main = Ext.create('SiteSelector.view.tablet.Main');
			} else {
				main = Ext.create('SiteSelector.view.phone.Main');
			}
			viewport.add(main).show();
		};
		Ext.Viewport.on("orientationchange", function(viewport, orientation) {
			defaultViewport(viewport);
			return false;
		});
		defaultViewport(Ext.Viewport);
	}
});