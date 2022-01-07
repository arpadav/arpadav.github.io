"use strict";

// BRUH
console.log("bruh");

// "use strict";
var page = require('webpage').create();
var system = require('system');
var args = system.args;
if (args.length != 2) {
  console.log("usage: " + args[0] + " text");
  phantom.exit(1);
}
page.onConsoleMessage = function(msg) {
  console.log(msg);
};
page.onResourceRequested = function(request) {
  console.log('Request ' + JSON.stringify(request, undefined, 4));
};
page.open("https://translate.google.it/?hl=it&tab=wT#fr/it/" + args[1], function(status) {
  if (status === "success") phantom.exit(0);
  else phantom.exit(1);
});
