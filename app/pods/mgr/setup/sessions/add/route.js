import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {};
  },

  actions: {
    save: function (model) {
      var self = this;
      var newRecord = this.store.createRecord('session', model);
      newRecord.save().then(function (post) {
        self.get('notify').success('Session Created');
        self.transitionTo('mgr.setup.sessions');
      }, function (reason) {
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
