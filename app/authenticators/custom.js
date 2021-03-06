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


    if (Ember.isEmpty(identification) || Ember.isEmpty(password) || identification.length < 5 || password.length < 4) {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        reject({
          error: "Please fill in a complete username and password to login."
        });
      });
    } else {
      return new Ember.RSVP.Promise(function (resolve, reject) {
        // make XHR request to api
        self.makeRequest({email: identification, password: password}).then(function (response) {
          // perform some validation to verify that we got a valid response from API
          if ((typeof response.data === 'undefined') || (typeof response.data.id === 'undefined')) {
            var errorMessage = "<h4>Could not log you into the system: </h4> No valid user found";
            self.get('notify').alert({raw: errorMessage, closeAfter: 10000});
            reject(response);
          } else {
            console.log('authenticators:custom:authenticate....resolving');
            resolve(response);
          }
        }, function (reason) {
          if (reason && reason.status === 422) {
            // Validation Error, inform user and swallow error
            self.get('notify').alert('Some Error occured!');
          } else {
            self.get('notify').alert('An internal error occured');
          }
        });
      });

    }
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
