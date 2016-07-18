import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  session: Ember.inject.service(),

  model: function (params) {
    var id = this.get('session.data.authenticated.data.attributes.account-id');
    return this.store.findRecord('account', id, {include: 'owners,attendees'});
  }
});
