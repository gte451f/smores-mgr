import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(Account, {
  currentAccount: Ember.inject.service(),

  // can do this since account service will load the full record
  model: function (params) {
    return this.store.peekRecord('account', this.get('currentAccount.id'));
  }
});