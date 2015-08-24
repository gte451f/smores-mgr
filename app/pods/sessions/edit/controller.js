import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    actions: {
        //handle save operation
        save: function () {
            var self = this;
            var location = this.get('model');

            location.save().then(function (post) {
                console.log('success!');
                self.notify.success('Session Saved!!');
                self.transitionToRoute('sessions');
            }, function (reason) {
                self.validationReport(location);
            });
        }
    }
});
