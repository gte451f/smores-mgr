import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import moment from 'moment';
import AddPayment from 'smores-mgr/mixins/crud/payment-route';

export default Ember.Route.extend(AddPayment, Error, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  // where should the payment form return to when a payment is made?
  returnRoute: 'client.billing.summary',
  returnRouteData: null,

  // file|new
  // tell the system which way to process card data
  cardMode: 'file',

  // should the card be saved for future use
  saveCard: false,

  /**
   * create a blank payment record & gather available credit cards
   * @param params
   * @returns {*}
   */
  model: function (params) {
    let currentAccount = this.get('currentAccount');
    let id = currentAccount.get('id');
    let currentYear = moment().year();
    // let currentMonth = moment().format('MM');

    return Ember.RSVP.hash({
      model: {
        payment: {amount: null, check: null, card: null},
        selectedCard: null,
        newCard: {},
        mode: 'file',
        isSpinning: false,
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

    controller.set('model.cards', cards);
    controller.set('model.cardMode', this.get('cardMode'));
  }

});
