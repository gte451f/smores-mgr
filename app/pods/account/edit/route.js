import Ember from 'ember';

export default Ember.Route.extend({
  currentAccount: Ember.inject.service(),

  // can do this since account service will load the full record
  model: function (params) {
    return this.store.peekRecord('account', this.get('currentAccount.id'));
  }
});
