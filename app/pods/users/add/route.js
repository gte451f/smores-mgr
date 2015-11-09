import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  model: function (params) {
    // empty object
    return {};
  },

  actions: {
    save: function (model) {
      var self = this;
      var newRecord = this.store.createRecord('employee', model);
      newRecord.save().then(function (post) {
        self.get('notify').success('Employee Created');
        self.transitionToRoute('users.info', newRecord);
      }, function (reason) {
        self.validationReport(newRecord);
        newRecord.deleteRecord();
      });
    }
  }
});
