import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['users'],

    actions: {
        save: function (model) {
            var self = this;
            var newRecord = this.store.createRecord('employee', model);
            newRecord.save().then(function (post) {
                self.get('controllers.users').get('model').content.addRecord(newRecord);
                self.notify.success('Success saving employee!');
                self.transitionToRoute('users.info', post);
            }, function (reason) {
                self.validationReport(newRecord);
            });
        }
    }
});
