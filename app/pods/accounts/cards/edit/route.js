import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

    actions: {
        //handle save operation
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                self.notify.success('Credit Card Saved!!');
                self.transitionTo('accounts.cards');
            }, function (reason) {
                self.validationReport(model);
            });
        }
    }
});
