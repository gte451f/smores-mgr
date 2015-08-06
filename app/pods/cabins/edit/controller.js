import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    genders: ["Male", "Female", "Mixed"],
    actions: {
        //handle save operation
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                self.notify.success('Cabin Saved');
                self.transitionToRoute('cabins', post);
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});