import Ember from "ember";
import Base from "simple-auth/authenticators/base";
import LocalStorage from 'simple-auth/stores/local-storage';
import ENV from 'smores-mgr/config/environment';
import Notify from 'ember-notify';

export default Base.extend({
  /**
   * @param data
   */
  restore: function (data) {
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
  authenticate: function (credentials, options) {
    return new Ember.RSVP.Promise(function (resolve, reject) {
      // make the request to authenticate the user at endpoint /v3/token
      Ember.$.ajax({
        url: ENV.auth.login,
        type: 'POST',
        data: {
          email: credentials.identification,
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
            lastName: response.lastName,
            id: response.id,
            accountId: response.accountId,
            type: 'Account'
          });
        });
      }, function (xhr, status, error) {
        var errorMessage = "<h4>Could not log you into the system: </h4>" + xhr.responseJSON.records.userMessage;
        Notify.alert({raw: errorMessage, closeAfter: 10000});
      });
    });
  },

  /**
   * logout
   * @returns {Rx.Promise}
   */
  invalidate: function () {
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
