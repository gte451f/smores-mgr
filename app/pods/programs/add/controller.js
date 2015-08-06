import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['programs'],

    actions: {
        save: function (model) {
            var self = this;
            var newRecord = this.store.createRecord('program', model);
            newRecord.save().then(function (post) {
                self.get('controllers.programs').get('model').content.addRecord(post);
                self.notify.success('Success saving program!');
                self.transitionToRoute('programs.info', post);
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});