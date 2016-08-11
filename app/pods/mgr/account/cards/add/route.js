import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, Error, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function (params) {
    return this.store.createRecord('card', {active: 1, account: null, isDebit: 0, allowReoccuring: null});
  },

  actions: {
    /**
     * save a new card to api
     * @param card
     */
    save: function (card) {
      let currentAccount = this.get('currentAccount.account');
      card.set('account', currentAccount);
      card.save().then((data) => {
        this.get('notify').success('Success saving card!');
        this.transitionTo('mgr.account.cards');
      }, (reason) => {
        this.handleFormError(reason);
      });
    }
  }
});
