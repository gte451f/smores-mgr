import Ember from "ember";
import Base from "simple-auth/authorizers/base";

export default Base.extend({
    // the custom authorizer that authorizes requests against the custom server
    authorize: function (jqXHR, requestOptions) {
        if (this.get('session.isAuthenticated') && !Ember.isEmpty(this.get('session.token'))) {
            jqXHR.setRequestHeader('X-Authorization', 'Token: ' + this.get('session.token'));
        }
    }
});