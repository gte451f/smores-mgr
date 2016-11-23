import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

  model: function (params) {
    let accountId = this.get('session.data.authenticated.data.attributes.account-id');

    return Ember.RSVP.hash({
      registrations: this.store.query('registration', {'attendees:account_id': accountId, with: 'attendees'}),
      events: this.store.findAll('event', {include: 'all'})
    });
  },

  setupController: function (controller, resolved) {
    var self = this;
    // get the full event here since we need to side load in event details
    resolved.registrations.forEach(function (reg) {
      self.store.query('request', {'registration_id': reg.get('id'), with: 'all', sort: 'priority'});
    });

    this._super(controller, resolved);
  }
});
