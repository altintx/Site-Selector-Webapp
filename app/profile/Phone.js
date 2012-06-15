Ext.define('SiteSelector.profile.Phone', {
	extend: 'Ext.app.Profile',
	config: {
		name: 'Phone',
		views: ['BodyPanel']
	},

	isActive: function() {
		return true;
		return Ext.os.is.Phone;
	}
});		