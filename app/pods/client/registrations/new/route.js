import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import NewRegRoute from 'smores-mgr/mixins/crud/registrations/new-route';


export default Ember.Route.extend(AuthenticatedRouteMixin, NewRegRoute, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  afterSaveRoute: 'client.registrations.info',

  /**
   * load all relevant attendees in addition to what the mixin is already doing
   *
   * @param params
   * @returns {*}
   */
  model: function (params) {
    var accountId = this.get('currentAccount.id');
    return Ember.RSVP.hash({
      attendees: this.store.query('attendee', {account_id: accountId}),
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin'),
      fees: this.store.query('fee', {basis: 'Registration'})
    });
  }

});
