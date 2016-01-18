import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function () {
    return {};
  },

  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set("genders", ["Male", "Female", "Mixed"]);
  },

  actions: {
    save: function (model) {
      var self = this;
      var newRecord = this.store.createRecord('cabin', model);
      newRecord.save().then(function (post) {
        self.get('notify').success('Cabin Created');
        self.transitionTo('cabins');
      }, function (reason) {
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
