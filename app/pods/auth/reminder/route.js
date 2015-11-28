import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import ENV from 'smores-mgr/config/environment';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {email: null};
  },

  actions: {
    reminder: function (model) {
      var self = this;

      Ember.$.ajax({
        url: ENV.APP.restNameSpace + "/auth/reminder",
        type: "POST",
        data: model
      }).then(function (response) {
        self.transitionTo('auth.reset');
        self.get('notify').success('Success!  Check your email for a secret code and use it here to reset your password.', {closeAfter: 15000});
      }, function (error) {
        // error handler here
        // this handler assumes validation errors
        // until we get our error handling under control, show a standard error below
        // self.handleXHR(error);
        self.get('notify').error('Error!  The Username or Email provided does not match up with an eligible account.  Please try again with a valid Email or Username', {closeAfter: 10000});
      });
    }
  }

});