import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  actions: {
    /**
     *
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.get('notify').success('Fee Saved');
        self.transitionTo('mgr.setup.fees');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});