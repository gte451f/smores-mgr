import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  model: function (params) {
    var sessionData = this.get('session.data.authenticated');
    if (sessionData.accountId > 0) {
      return this.store.query('account', {id: sessionData.accountId, with: 'all'});
    } else {
      this.get('notify').error('Could not load your account!  Please logout and log back into the system.');
    }
  },

  setupController: function (controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }
});