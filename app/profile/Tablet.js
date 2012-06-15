Ext.define('SiteSelector.profile.Tablet', {
	extend: 'Ext.app.Profile',
	config: {
		name: 'Tablet',
		views: ["BodyPanel"]
	},

	isActive: function() {
		return false;
		return !Ext.os.is.Phone;
	}
});