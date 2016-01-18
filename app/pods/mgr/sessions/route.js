import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
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
