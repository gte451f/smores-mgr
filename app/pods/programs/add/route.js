import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

  //reset the model in case you return to add another record
  model: function () {
    return {};
  },

  actions: {
    /**
     *
     * @param formData
     */
    save: function (formData) {
      var self = this;
      var newRecord = this.store.createRecord('program', formData);
      newRecord.save().then(function (post) {
        self.notify.success('Program Created');
        self.transitionTo('programs.info', newRecord);
      }, function (reason) {
        self.validationReport(newRecord);
        newRecord.deleteRecord();
      });
    }
  }
});
