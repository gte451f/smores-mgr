import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model: function (params) {
    var sessionData = this.get('session.data.authenticated');
    return this.store.query('account', {with: 'owners,attendees', id: sessionData.accountId});
  },

  setupController: function (controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }

});