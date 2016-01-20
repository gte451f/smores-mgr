import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  actions: {
    //handle save operation
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.get('notify').success('Location Saved');
        self.transitionTo('mgr.setup.programs.info', model);
      }, function (reason) {
        self.simpleReport(model);
        // self.validationReport(model);
      });
    }
  }
});
