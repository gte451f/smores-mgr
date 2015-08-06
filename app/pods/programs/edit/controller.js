import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    actions: {
        //handle save operation
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                console.log('success!');
                self.notify.success('Record Saved!!');
                self.transitionToRoute('programs.info', post);
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
