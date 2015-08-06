/**
 * register both the Authenticator and Authorizer w/ Ember
 */
import CustomAuthenticator from "../authenticators/custom";
import CustomAuthorizer from "../authenticators/authorizer";

export default {
    name: 'authentication',
    before: 'simple-auth',
    initialize: function (container, application) {
        container.register('authenticator:custom', CustomAuthenticator);
        container.register('authorizer:custom', CustomAuthorizer);
    }
};