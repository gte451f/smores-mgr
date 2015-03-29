/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Use `app.import` to add additional libraries to the generated
// output files.
//
// If you need to use different assets in different
// environments, specify an object as the first parameter. That
// object's keys should be the environment name and the values
// should be the asset to use in that environment.
//
// If the library that you are including contains AMD or ES6
// modules that you would like to import into your application
// please specify an object with the list of modules as keys
// along with the exports of each module as its value.

app.import('app/styles/google-font.css');

// add styles & javascript required by the template
app.import('app/styles/landerapp.css');
app.import('app/styles/theme.dust.css');

// bootstrap config
app.import('bower_components/bootstrap/dist/css/bootstrap.css');
app.import('bower_components/bootstrap/dist/css/bootstrap.css.map', {destDir: 'assets'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.eot', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.ttf', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.svg', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/fonts/glyphicons-halflings-regular.woff2', {destDir: 'fonts'});
app.import('bower_components/bootstrap/dist/js/bootstrap.js');
// end bootstrap





module.exports = app.toTree();
