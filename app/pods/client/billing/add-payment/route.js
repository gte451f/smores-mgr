import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  // file|new
  // tell the system which way to process card data
  mode: 'file',

  // should the card be saved for future use
  saveCard: false,

  /**
   * create a blank payment record & gather available credit cards
   * @param params
   * @returns {*}
   */
  model: function (params) {
    return Ember.RSVP.hash({
      model: {selectedCard: null, newCard: {}, amount: null, mode: 'file', isSpinning: false},
      cards: this.store.query('card', {account_id: params.account_id})
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
  },

  actions: {
    /**
     * gather payment information and post to api
     * who is responsible for saving to 3rd party gateway?
     *
     */
    save: function () {
      var self = this;
      var controller = self.controllerFor('client.billing.add-payment');
      var model = controller.get('model');
      controller.set('model.isSpinning', true);

      // all payments from the portal are credit card
      var payment = {mode: 'card'};

      // simple validation
      if (model.amount < 10) {
        this.get('notify').alert('Payment amount must exceed $10');
        // reset spinner
        controller.set('model.isSpinning', false);
        return;
      }

      // user must select a card
      if (Ember.isEmpty(model.selectedCard) && model.mode === 'file') {
        this.get('notify').alert('Please select a card on file to bill');
        //// reset spinner
        controller.set('model.isSpinning', false);
        return;
      }

      // end simple validation

      payment.amount = model.amount;
      var accountId = this.get('session.data.authenticated.data.attributes.account-id');
      payment.account = this.store.peekRecord('account', accountId);

      var mode = model.mode;

      if (mode === 'new' && this.get('saveCard') === false) {
        // save card first
        // then save payment
        this.saveNewFilePayment(model.newCard, payment);
      }

      if (mode === 'file') {
        payment.card = model.selectedCard;
        this.saveFilePayment(payment);
      } else {
        // what do we do with a new credit card that we only want for this payment?
        // probably a custom jquery xhr request here
        // since we can't post a model w/ custom properties
      }

      console.log(payment);
    }
  },

  /**
   * isolate logic to save a simple payment for an existing card
   * @param payment
   */
  saveFilePayment: function (payment) {
    var self = this;

    var newRecord = this.store.createRecord('payment', payment);
    newRecord.save().then(function (post) {
      self.get('notify').success('Payment Saved');
      // reset for next run
      self.set('model.amount', 0);
      self.transitionTo('client.billing.summary');
    }, function (reason) {
      // roll back progress
      newRecord.deleteRecord();
      self.validationReport(newRecord);
    }).then(function () {
      // reset the spinner no matter the result
      var controller = self.controllerFor('client.billing.add-payment');
      controller.set('model.isSpinning', false);
    });
  },

  /**
   * perform 2 steps
   * save a new credit card to the system
   * apply a payment against that credit card
   *
   * @param payment
   * @returns {boolean}
   */
  saveNewFilePayment: function (newCard, payment) {
    var self = this;

    // set some default values on the newCard
    newCard.active = 1;
    var accountId = this.get('session.data.authenticated.data.attributes.account-id');
    newCard.account = this.store.peekRecord('account', accountId);

    if (Ember.isEmpty(newCard.account)) {
      // error, no account detected
      this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
      return false;
    }

    var newRecord = this.store.createRecord('card', newCard);
    newRecord.save().then(function (post) {
      self.get('notify').success('Card saved to your file');

      // update selected card to match the newly created card
      payment.card = newRecord;

      // update form to use new card on file
      self.set('model.currentCard', newRecord);
      self.set('mode', 'file');
      self.controllerFor('client.billing.add-payment').send('toggleCredit', 'file');

      // now save the payment
      self.saveFilePayment(payment);
    }, function (reason) {
      // roll back progress
      newRecord.deleteRecord();
      self.validationReport(newRecord);
    }).then(function () {
      // reset the spinner no matter the result
      var controller = self.controllerFor('client.billing.add-payment');
      controller.set('model.isSpinning', false);
    });
  }

});
