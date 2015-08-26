import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  actions: {
    //handle save operation
    save: function (employee) {
      var self = this;
      employee.userType = 'Employee';
      employee.save().then(function (post) {

        //lets try doing nothing first
        //reset password to blank
        // employee.set('password', null);

        self.notify.success('Employee Saved');
        self.transitionTo('users.info', employee.get('id'));
      }, function (reason) {
        self.validationReport(employee);
      });
    }
  }
});
