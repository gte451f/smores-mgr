import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  //reset the model in case you return to add another record
  model: function () {
    return {};
  },

  actions: {
    save: function (model) {
      var self = this;
      var newRecord = this.store.createRecord('fee', model);
      newRecord.save().then(function (post) {
        self.notify.success('Fee Created');
        self.transitionTo('fees');
      }, function (reason) {
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
