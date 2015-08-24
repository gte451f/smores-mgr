import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['fees'],

    actions: {
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                self.get('controllers.fees').get('model').content.addRecord(post);
                self.notify.success('Success saving program!');
                self.transitionToRoute('fees.info', post);
            }, function (reason) {
                self.validationReport(model);
            });
        }
    }
});
