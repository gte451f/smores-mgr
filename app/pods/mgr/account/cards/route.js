import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(ErrorHandler, Account, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  /**
   * load card and account data
   *
   * @param params
   * @returns {*}
   */
  model(params) {
    return Ember.RSVP.hash({
      cards: this.store.query('card', {account_id: this.get('currentAccount.id')}),
      account: this.store.peekRecord('account', this.get('currentAccount.id'))
    });
  }
});
