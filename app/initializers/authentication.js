import Configuration from 'simple-auth/configuration';
import setup from 'simple-auth/setup';
import ENV from '../config/environment';
import CustomAuthenticator from "../authenticators/custom";

export default {
    name:       'authentication',
    before:     'simple-auth',
    initialize: function(container, application) {
        container.register('authenticator:custom', CustomAuthenticator);
    }
};
