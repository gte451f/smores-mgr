import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  model (params) {
    return Ember.RSVP.hash({
      cards: this.store.query('card', {account_id: this.get('currentAccount.id')}),
      account: this.store.peekRecord('account', this.get('currentAccount.id'))
    });
  }
});
