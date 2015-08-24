import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['locations'],

    actions: {
        save: function (model) {
            var self = this;
            var newRecord = this.store.createRecord('location', model);
            newRecord.save().then(function (post) {
                self.get('controllers.locations').get('model').content.addRecord(newRecord);
                self.notify.success('Success saving location!');
                self.transitionToRoute('locations.info', post);
            }, function (reason) {
                self.validationReport(newRecord);
            });
        }
    }
});
