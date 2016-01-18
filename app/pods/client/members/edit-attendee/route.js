import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  actions: {
    /**
     * update an existing attendee
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function () {
        self.transitionTo('client.members.list');
        self.get('notify').success('Camper Saved');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
