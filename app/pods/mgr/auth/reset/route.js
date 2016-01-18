import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import ENV from 'smores-mgr/config/environment';
import UnauthenticatedRouteMixin from 'ember-simple-auth/mixins/unauthenticated-route-mixin';

export default Ember.Route.extend(ErrorHandler, UnauthenticatedRouteMixin, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {password: null, code: null, password_confirm: null};
  },

  actions: {
    reset: function (model) {
      var self = this;

      Ember.$.ajax({
        url: ENV.APP.restNameSpace + "/auth/reset",
        type: "POST",
        data: model
      }).then(function (response) {
        self.transitionTo('mgr.auth.login');
        self.get('notify').success('Success!  Your password is now reset.  Please proceed to login as normal.', {closeAfter: 15000});
      }, function (error) {
        self.get('notify').error('Error!  The code or password are not valid.', {closeAfter: 10000});
      });
    }
  }
});
