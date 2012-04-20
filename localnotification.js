/**
Phonegap LocalNotification Plugin
Copyright (c) Greg Allen 2011
MIT Licensed

Usage:
	plugins.localNotification.add({ date: new Date(), message: 'This is a notification', badge: 1, id: 123 });
	plugins.localNotification.cancel(123);
	plugins.localNotification.cancelAll();
**/
var LocalNotification = function() {

};

LocalNotification.prototype.add = function(options) {
	if (!Cordova.available) {
		return console.log("Trying to use native notifications but Cordova is not available");
	}
	var defaults = {
		date: false,
		message: '',
		hasAction: true,
		action: 'View',
		badge: 0,
		id: 0
	};
	for (var key in defaults) {
		if (typeof options[key] !== "undefined")
		defaults[key] = options[key];
	}
	if (typeof defaults.date == 'object') {
		defaults.date = Math.round(defaults.date.getTime()/1000);
	}
	var arguments = [];
	for (key in defaults) {
		arguments.push(defaults[key]);
	}
	Cordova.exec(
		function() { console.log("Added notification ID#" + defaults.id); }, 
		function() { console.log("Failed adding notification ID#" + defaults.id); }, 
		"LocalNotification", 
		"addNotification", 
		arguments
	);
};

LocalNotification.prototype.cancel = function(id) {
	if (!Cordova.available) {
		return console.log("Trying to use native notifications but Cordova is not available");
	}
	Cordova.exec(
		function() { console.log("Cancelled notification ID#" + id); }, 
		function() { console.log("Failed cancelling notification ID#" + id); }, 
		"LocalNotification", 
		"cancelNotification", 
		[id.toString()]
	);

};

LocalNotification.prototype.cancelAll = function(id) {
	if (!Cordova.available) {
		return console.log("Trying to use native notifications but Cordova is not available");
	}
	Cordova.exec(
		function() { console.log("Cancelled notifications"); }, 
		function() { console.log("Failed cancelling notifications"); }, 
		"LocalNotification", 
		"cancelAllNotifications", 
		[]
	);
};

Cordova.addConstructor(function() {
	localNotification = new LocalNotification();
});