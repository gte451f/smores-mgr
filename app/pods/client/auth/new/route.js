import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import ENV from 'smores-mgr/config/environment';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {
      password_confirm: null,
      email: '',
      first_name: '',
      last_name: '',
      user_type: 'Owner',
      gender: null,
      relationship: '',
      user: null,
      password: '',
      number: '',
      primary: 1,
      phone_type: ''
    };
  },

  actions: {
    // use a custom function to create the record
    // partially because most end points are blocked until the user authenticates
    save: function (model) {
      var self = this;

      //validate here?

      Ember.$.ajax({
        url: ENV.APP.restNameSpace + "/auth/create",
        type: "POST",
        data: model
      }).then(function (response) {
        self.transitionTo('client.auth.activate');
        self.get('notify').success('Success creating your account!  Check your email for an activation code to enter on the next screen.', {closeAfter: 15000});
      }, function (error) {
        // error handler here
        // this handler assumes validation errors
        // until we get our error handling under control, show a standard error below
        self.handleXHR(error);
        // self.get('notify').error('Error!  The Username or Email provided does not match up with an eligible account.  Please try again with a valid Email or Username', {closeAfter: 10000});
      });

    }
  }
});
