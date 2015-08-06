# Smores-mgr

This is a swanky camp management system written in the very fine Ember framework.

## Prerequisites

A working Ember CLI Environment
Linux (I don't do much Windows work so the help is biased)
The API!  Smores depends on a sister project that runs a Phalcon based API
The api has it's own set of requirements.

## Installation

* `git clone https://github.com/gte451f/smores-mgr.git`
* `cd smores-mgr`
* `npm install`
* `bower install`

**Important**
Modify the following files BEFORE you attempt to run the application

**bower_components/admin-lte/build/less/AdminLTE.less**
Comment out lines 15 & 16  
```
//@import "../bootstrap-less/mixins.less";  
//@import "../bootstrap-less/variables.less";
```

**bower_components/admin-lte/build/less/skins/skin-blue.less**
Comment out lines #5 & 6  
```
//@import "../../bootstrap-less/mixins.less";  
//@import "../../bootstrap-less/variables.less";
```


## Running / Development

* `ember server`
* Visit your app at [http://localhost:4200](http://localhost:4200).

### Code Generators

Make use of the many generators for code, try `ember help generate` for more details

### Running Tests

* `ember test`
* `ember test --server`

### Building

* `ember build` (development)
* `ember build --environment production` (production)

### Deploying

Specify what it takes to deploy your app.

## Further Reading / Useful Links

* [ember.js](http://emberjs.com/)
* [ember-cli](http://www.ember-cli.com/)
* Development Browser Extensions
  * [ember inspector for chrome](https://chrome.google.com/webstore/detail/ember-inspector/bmdblncegkenkacieihfhpjfppoconhi)
  * [ember inspector for firefox](https://addons.mozilla.org/en-US/firefox/addon/ember-inspector/)

