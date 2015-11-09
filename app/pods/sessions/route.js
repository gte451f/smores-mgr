import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  model: function (params) {
    return this.store.findAll('session');
  },

  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {
      var self = this;
      model.destroyRecord().then(function () {
        self.get('notify').success('Session Removed');
        self.transitionTo('sessions');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
