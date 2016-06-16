import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  /**
   * load credit cards for display
   * @param params
   * @returns {*}
   */
  model: function (params) {
    var accountId = this.get('session.data.authenticated.data.attributes.account-id');

    if (Ember.isEmpty(accountId)) {
      // error, no account detected
      this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
      return false;
    }
    return this.store.query('card', {account_id: accountId});
  },

  actions: {

    /**
     * delete a credit card from the server
     * @param card
     */
    delete: function (card) {
      var self = this;
      card.destroyRecord().then(function () {
        self.get('notify').success('Credit Card Removed');
      }, function (reason) {
        self.validationReport(card);
      });
    }
  }
});
