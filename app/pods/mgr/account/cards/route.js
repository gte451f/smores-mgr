import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(ErrorHandler, Account, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  model: function (params) {
    return Ember.RSVP.hash({
      cards: this.store.query('card', {account_id: this.get('currentAccount.id')}),
      account: this.store.peekRecord('account', this.get('currentAccount.id'))
    });
  },

  setupController(controller, resolved){
    this._super(controller, resolved.account);
    controller.set('cards', resolved.cards);
  },

  actions: {
    delete: function (card) {
      var self = this;
      card.destroyRecord().then(function () {
        self.get('notify').success('Successfully removed credit card');
      }, function (reason) {
        self.validationReport(card);
      });
    }
  }
});
