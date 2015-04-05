import Ember from "ember";
import Base from "simple-auth/authenticators/base";
import LocalStorage from 'simple-auth/stores/local-storage';

export default Base.extend({
    url: 'http://localhost:4200/smores-api/v1/auth/login',

    /**
     * @param data
     */
    restore: function (data) {
        console.log('restore ran');
        var local = LocalStorage.create();
        return Ember.RSVP.resolve(local.restore());
    },

    /**
     * @param credentials
     * @param options
     * @returns {Rx.Promise}
     */
    authenticate: function (credentials, options) {
        var _this = this;
        return new Ember.RSVP.Promise(function (resolve, reject) {
            var loginPromise = Ember.$.ajax(_this.url, {
                username: credentials.identification,
                password: credentials.password
            });
            loginPromise.then(function (data) {
                resolve({
                    token2: 'yellow',
                    userData2: 12
                }, function (error) {
                    reject(error);
                });
            });
        });
    },

    /**
     * logout
     * @returns {Rx.Promise}
     */
    invalidate: function () {
        console.log('ran invalidate');
        var _this = this;

        function success(resolve) {
            Ember.run.cancel(_this._refreshTokenTimeout);
            delete _this._refreshTokenTimeout;
            resolve();
        }

        return new Ember.RSVP.Promise(function (resolve, reject) {
            var invalidatePromise = Ember.$.ajax(_this.url, {});
            invalidatePromise.then(function (data) {
                success(resolve);
            });
        });
    }
});