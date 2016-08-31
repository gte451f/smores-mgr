import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(Account, {
  currentAccount: Ember.inject.service(),

  model: function (params) {
    return Ember.RSVP.hash({
      account: this.store.peekRecord('account', this.get('currentAccount.id')),
      registrations: this.store.query('registration', {
        'attendees:account_id': this.get('currentAccount.id'),
        with: 'all'
      }),
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
