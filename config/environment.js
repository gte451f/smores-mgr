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
        // ENV.APP.LOG_RESOLVER = true;
        // ENV.APP.LOG_ACTIVE_GENERATION = true;
        // ENV.APP.LOG_TRANSITIONS = true;
        // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
        // ENV.APP.LOG_VIEW_LOOKUPS = true;

        //used for CSP
        ENV.APP.restDestination = 'http://localhost:8080';
    }

    if (environment === 'test') {
        // Testem prefers this...
        ENV.baseURL = '/';
        ENV.locationType = 'none';

        // keep test console output quieter
        ENV.APP.LOG_ACTIVE_GENERATION = false;
        ENV.APP.LOG_VIEW_LOOKUPS = false;

        ENV.APP.rootElement = '#ember-testing';
    }

    if (environment === 'production') {

    }


    //https://github.com/rwjblue/ember-cli-content-security-policy
    ENV.contentSecurityPolicy = {
        'default-src': "'none'",
        'script-src': "'self' 'unsafe-eval' 'unsafe-inline'",
        'font-src': "'self' fonts.gstatic.com",
        'connect-src': "'self' " + ENV.APP.restDestination,
        'img-src': "'self' data:",
        'style-src': "'self' 'unsafe-inline'",
        'media-src': "'self'"
    };

    ENV['simple-auth'] = {
        serverTokenRevocationEndpoint: '/revoke',
        serverTokenEndpoint: 'http://localhost:8080/smors-api/v1/auth/login',
        store: 'simple-auth-session-store:local-storage',
        authenticationRoute: 'auth.login'
    };

    return ENV;
};
