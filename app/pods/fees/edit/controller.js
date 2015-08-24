import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    actions: {
        //handle save operation
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                self.notify.success('Fee Saved');
                self.transitionToRoute('fees.info', post);
            }, function (reason) {
                self.validationReport(model);
            });
        }
    }
});