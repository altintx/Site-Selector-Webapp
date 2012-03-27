HTML5 Webapp for tracking placement of durable medical equipment relating to diabetes on human body.

Dependencies
------------
* Sencha Touch 2.0
* Apache Cordova (PhoneGap) - the JavaScript file is bundled to ease compilation into a Native package, but is not required to run the application in a browser.
* HTML5 LocalStorage - Sites are stored client-side. Sencha Touch will patch a compatible API if the browser does not support local storage, but it can't be relied on persisting and will greatly limit the application's utility. 

Compatability
-------------
Being based on Sencha Touch, SiteSelector is effectively limited to Webkit-based renders. It won't work in Gecko, Trident, or Presto. There are no constraints to enforce this, so SiteSelector will likely fail catastrophically if you try.


