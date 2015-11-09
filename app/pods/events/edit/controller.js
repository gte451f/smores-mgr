import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  actions: {
    // update an existing event record on the api
    save: function (event) {
      var model = this.get('model');
      var self = this;
      model.save().then(function () {
        self.transitionToRoute('events.info', model.get('id'));
        self.get('notify').success('Event was saved!');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
