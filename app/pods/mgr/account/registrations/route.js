import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(Account, {
  currentAccount: Ember.inject.service(),

  model: function (params) {
    return Ember.RSVP.hash({
      model: this.store.peekRecord('account', this.get('currentAccount.id')),
      registrations: this.store.query('registration', {
        'attendees:account_id': this.get('currentAccount.id'),
        with: 'all'
      })
    });
  },

  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);
    controller.set('registrations', resolved.registrations);
  }
});