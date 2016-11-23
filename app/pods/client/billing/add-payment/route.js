import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import AddPayment from 'smores-mgr/mixins/crud/payment-route';
import moment from 'moment';

export default Ember.Route.extend(AddPayment, ErrorHandler, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  /**
   * create a blank payment record & gather available credit cards
   * @param params
   * @returns {*}
   */
  model: function (params) {
    let currentAccount = this.get('currentAccount');
    let id = currentAccount.get('id');
    let currentYear = moment().year();

    return Ember.RSVP.hash({
      model: {
        newPayment: this.store.createRecord('payment', {amount: null}),
        newCard: this.store.createRecord('card', {active: 1, account: null, isDebit: 0, allowReoccuring: 1}),
        selectedCard: null, // the card object to be used
        isPending: false,   // used to drive the spinner button
        useNewCard: false,  // if paying by credit, should we expect a new card or use an existing card on file
        saveNewCard: false,  // if paying by a new card, should we save the new card for future use?
        mode: 'Credit',
        // where should the payment form return to when a payment is made?
        returnRoute: 'client.billing.summary',
        returnRouteData: null,
        account: this.store.peekRecord('account', id)
      },
      cards: this.store.query('card', {
        account_id: id,
        expiration_year: '>=' + currentYear
      })
    });
  },

  /**
   * format cards for display in select box
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);
    var cards = resolved.cards;
    cards.forEach(function (item) {
      item.set('name', item.get('vendor') + ' - ' + item.get('expirationMonth') + '/' + item.get('expirationYear'));
    });
    controller.set('model.existingCards', cards);
    controller.set('model.account', this.get('currentAccount.account'));
    //supply return route data for save action
    this.set('model.returnRouteData', this.get('currentAccount.id'));
  }

});
