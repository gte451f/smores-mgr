import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  /**
   * load account_id at the earliest possible moment for nested routes to reference
   * careful to proceed only if authenticated
   *
   * @param transition
   * @returns {boolean}
   */
  beforeModel: function (transition) {
    if (this.get('session.isAuthenticated')) {
      let parentRoute = transition.params['mgr.account'];
      let account_id = null;
      if (Ember.isEmpty(parentRoute)) {
        // attempt to pull from session
        account_id = this.get('session.data.authenticated.data.attributes.account-id');
      } else {
        account_id = parentRoute.account_id;
      }

      if (Ember.isEmpty(account_id)) {
        console.error('Could not load expected account_id!');
      } else {
        let account = this.get('currentAccount');
        account.set('id', account_id);
      }
    }
    return true;
  },

  /**
   * side load a bunch of extra records
   * if a valid account # is found
   *
   * @param params
   * @returns {*}
   */
  model: function (params) {
    let currentAccount = this.get('currentAccount');
    if (!Ember.isEmpty(currentAccount.get('id'))) {
      return this.store.queryRecord('account', {id: currentAccount.get('id'), with: 'all'});
    } else {
      return false;
    }
  },

  /**
   * save the account to currentAccount service
   *
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    if (!Ember.isEmpty(model)) {
      // notify account service
      let currentAccount = this.get('currentAccount');
      currentAccount.set('account', model);
      this.set('currentAccount', currentAccount);
    } else {
      model = {};
    }
    // push this to last so a valid model is defined
    this._super(controller, model);
  }

});
