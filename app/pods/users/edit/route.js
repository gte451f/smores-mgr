import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    actions: {
        //handle save operation
        save: function (employee) {
            var self = this;
            employee.userType = 'Employee';
            employee.save().then(function (post) {
                //reset password back to blank
                employee.set('password', null);

                self.notify.success('Employee Updated!');
                self.transitionTo('users.info', employee.get('id'));
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
