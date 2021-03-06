/* jshint node: true */

module.exports = function (environment) {
  var ENV = {
    modulePrefix: 'smores-mgr',
    // namespaced directory where resolver will look for your resource files
    podModulePrefix: 'smores-mgr/pods',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
  };

  if (environment === 'development') {
    // used for CSP
    ENV.APP.restDestination = 'http://localhost:4200';
    //need for ember data?
    ENV.APP.restNameSpace = 'v1';
    // Testem prefers this...
    ENV.baseURL = '/';

    ENV['camp'] = {
      name: 'Test Camp'
    };
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    //need for ember data?
    ENV.APP.restNameSpace = 'v1';
    // used for CSP
    ENV.APP.restDestination = 'http://localhost:4200';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';

    ENV['camp'] = {
      name: 'Test Camp'
    };
  }

  if (environment === 'production') {
    // ENV.baseURL = '/portal/';
    ENV.baseURL = '/##CLIENT##/mgr/';
    ENV.locationType = 'none';
    //need for ember data?
    ENV.APP.restNameSpace = 'api/v1';
    // used for CSP
    ENV.APP.restDestination = 'https://app.smores.camp/##CLIENT##';

    ENV['camp'] = {
      name: '##CLIENT##'
    };
  }

  //https://github.com/rwjblue/ember-cli-content-security-policy
  //https://github.com/rwjblue/ember-cli-content-security-policy
  ENV.contentSecurityPolicy = {
    'default-src': "'none' https://smores.camp",
    'script-src': "'self' 'unsafe-eval'",
    'font-src': "'self' data: fonts.gstatic.com",
    'connect-src': "'self' " + ENV.APP.restDestination,
    'img-src': "'self' data:",
    'style-src': "'self' 'unsafe-inline' fonts.googleapis.com",
    'media-src': "'self' " + ENV.APP.documentDownloadURL,
    'frame-src': "'self' " + ENV.APP.documentDownloadURL
  };

  ENV['ember-simple-auth'] = {
    authenticationRoute: 'client.auth.login',
    // routeAfterAuthentication: '',
    // routeIfAlreadyAuthenticated: ''
  };

  ENV['auth'] = {
    login: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/auth/login',
    logout: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/auth/logout'
  };

  ENV['ember-cli-toggle'] = {
    includedThemes: ['flat', 'light', 'default', 'flip'],
    excludedThemes: ['flat'],
    defaultTheme: 'light',  // defaults to 'default'
    defaultSize: 'medium',   // defaults to 'medium'
    defaultOff: 'False',    // defaults to 'Off'
    defaultOn: 'True'       // defaults to 'On'
  };

  return ENV;
}
;
