import Ember from "ember";
import Base from "ember-simple-auth/authenticators/base";
import ENV from 'smores-mgr/config/environment';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Base.extend(ErrorHandler, {
    notify: Ember.inject.service(),
    session: Ember.inject.service(),

    /**
     * @param data
     */
    restore: function (data) {
        console.log('authenticators:custom:restore was called');
        return Ember.RSVP.resolve(data);
    },

    /**
     * submit user supplied credentials to the API for authentication
     * for a good reference check here:
     * https://github.com/simplabs/ember-simple-auth/blob/master/examples/4-authenticated-account.html
     * @param credentials
     * @param options
     * @returns {Rx.Promise}
     */
    authenticate: function (identification, password) {
        console.log('authenticators:custom:authenticate was called');
        var self = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            // make XHR request to api
            self.makeRequest({email: identification, password: password}).then(function (response) {
                // perform some validation to verify that we got a valid response from API
                if ((typeof response.data === 'undefined') || (typeof response.data.id === 'undefined')) {
                    var errorMessage = "<h4>Could not log you into the system: </h4> No valid user found";
                    self.get('notify').alert({raw: errorMessage, closeAfter: 10000});
                    reject(response);
                } else {
                    debugger;
                    console.log('authenticators:custom:authenticate....resolving');
                    resolve(response);
                }
            }, function (xhr, status, error) {
                // use local error handling mixin
                self.handleXHR(xhr);
                reject(error);
            });
        });
    },

    /**
     * logout
     * @returns {Rx.Promise}
     */
    invalidate: function (data) {
        console.log('authenticators:custom:invalidate was called');
        return new Ember.RSVP.Promise(function (resolve, reject) {
            Ember.$.ajax({
                url: ENV.auth.logout,
                type: 'GET',
                headers: {'X-Authorization': 'Token: ' + data.token}
            }).then(function (response) {
                resolve(response);
            }, function (xhr, status, error) {
                console.log(xhr.responseJSON);
                // resolve anyway so simple auth will wipe the cached value
                resolve();
            });
        });
    },

    /**
     Makes a request to the API server.
     @method makeRequest
     @param {Object} data The request data
     @return {jQuery.Deferred} A promise like jQuery.Deferred as returned by `$.ajax`
     @protected
     */
    makeRequest(data) {
        return Ember.$.ajax({
            url: ENV.auth.login,
            type: 'POST',
            data: data
        });
    }

});
