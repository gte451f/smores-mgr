import Ember from "ember";
import Base from "simple-auth/authenticators/base";
import LocalStorage from 'simple-auth/stores/local-storage';
import ENV from 'smores-mgr/config/environment';

export default Base.extend({
    /**
     * @param data
     */
    restore: function (data) {
        console.log('restore ran');
        var local = LocalStorage.create();
        return Ember.RSVP.resolve(local.restore());
    },

    /**
     * submit user supplied credentials to the API for authentication
     * for a good reference check here:
     * https://github.com/simplabs/ember-simple-auth/blob/master/examples/4-authenticated-account.html
     * @param credentials
     * @param options
     * @returns {Rx.Promise}
     */
    authenticate: function (credentials, options) {
        // var self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            // make the request to authenticate the user at endpoint /v3/token
            Ember.$.ajax({
                url: ENV.auth.login,
                type: 'POST',
                data: {
                    username: credentials.identification,
                    password: credentials.password
                }
            }).then(function (response) {
                Ember.run(function () {
                    // resolve (including the account id) as the AJAX request was successful; all properties this promise resolves
                    // with will be available through the session
                    resolve({
                        token: response.token,
                        email: response.email,
                        expiresOn: response.expiresOn,
                        userName: response.userName,
                        firstName: response.firstName,
                        lastName: response.LastName,
                        id: response.id
                    });
                });
            }, function (xhr, status, error) {
                console.log(xhr.responseJSON);
            });
        });
    },

    /**
     * logout
     * @returns {Rx.Promise}
     */
    invalidate: function () {
        // var self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            // make the request to authenticate the user at endpoint /v3/token
            Ember.$.ajax({
                url: ENV.auth.logout,
                type: 'GET'
            }).then(function (response) {
                Ember.run(function () {
                    // nothing to do...
                    resolve();
                });
            }, function (xhr, status, error) {
                console.log(xhr.responseJSON);
                //resolve anyway
                resolve();
            });
        });
    }
});