import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['cabins'],
    genders: ["Male", "Female", "Mixed"],

    actions: {
        save: function (model) {
            var self = this;
            var newRecord = this.store.createRecord('cabin', model);
            newRecord.save().then(function (post) {
                self.get('controllers.cabins').get('model').content.addRecord(newRecord);
                self.notify.success('Success saving cabin!');
                self.transitionToRoute('cabins', post);
            }, function (reason) {
                self.validationReport(newRecord);
            });
        }
    }
});
