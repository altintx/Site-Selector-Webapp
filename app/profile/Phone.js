Ext.define('SiteSelector.profile.Phone', {
	extend: 'Ext.app.Profile',
	config: {
		name: 'Phone',
		views: ['Main']
	},

	isActive: function() {
		return Ext.os.is.Phone;
	},

	launch: function() {
		Ext.Viewport.add(Ext.create('SiteSelector.view.phone.Main'));
	}
});		