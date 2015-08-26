import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {

  actions: {
    /**
     *
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.notify.success('Session Saved');
        self.transitionTo('sessions');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }

});
