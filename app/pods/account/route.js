import Ember from 'ember';

export default Ember.Route.extend({
  currentAccount: Ember.inject.service(),

  // load account_id at the earliest possible moment for nested routes to reference
  beforeModel: function (transition) {
    let parentRoute = transition.params['account'];
    let account_id = parentRoute.account_id;

    if (Ember.isEmpty(account_id)) {
      console.error('Could not load expected account_id!');
    } else {
      let account = this.get('currentAccount');
      account.set('id', account_id);
    }
    return true;
  },

  /**
   * side load a bunch of extra records
   *
   * @param params
   * @returns {*}
   */
  model: function (params) {
    return this.store.queryRecord('account', {id: params.account_id, with: 'all'});
  },

  /**
   * save the open account to currentAccount service
   *
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    this._super(controller, model);

    // notify account service
    let currentAccount = this.get('currentAccount');
    currentAccount.set('account', model);
    this.set('currentAccount', currentAccount);
  }
});