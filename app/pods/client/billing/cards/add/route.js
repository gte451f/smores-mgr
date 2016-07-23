import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, Error, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  /**
   * create fake models so validation will work
   *
   * @param params
   * @returns {{phone: *, owner: *}}
   */
  model: function (params) {
    return this.store.createRecord('card', {active: 1});
  },

  /**
   * inject current account after it has had a chance to load
   *
   * @param controller
   * @param model
   */
  setupController: function (controller, model) {
    let currentAccount = this.get('currentAccount.account');
    if (Ember.isEmpty(currentAccount)) {
      // error, no account detected
      this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
    }
    this._super(controller, model);
  },


  actions: {

    /**
     * save a new card record
     *
     * @param card
     * @returns {boolean}
     */
    save: function (card) {
      this.controller.set('cardSaving', true);
      // set some default values on the model
      card.set('account', this.get('currentAccount.account'));
      card.save().then((data) => {
        //reset to original position
        this.set('model', this.store.createRecord('card', {active: 1}));
        this.get('notify').success('Card Added');
        this.controller.set('cardSaving', false);
        this.transitionTo('client.billing.cards.list');
      }, (reason) => {
        this.controller.set('cardSaving', false);
        this.handleFormError(reason);
      });
    }
  }
});
