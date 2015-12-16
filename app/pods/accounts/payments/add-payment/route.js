import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import ENV from 'smores-mgr/config/environment';
// import { moment, ago } from 'ember-moment/computed';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),
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
    // pull account from parent
    var account = this.modelFor('accounts.payments');

    return Ember.RSVP.hash({
      model: {
        payment: {amount: null, check: null, card: null},
        check: {number: null, date: null},
        newCard: {active: 1, account: null},
        selectedCard: null,
        isSpinning: false
      },
      cards: this.store.query('card', {account_id: account.id}),
      account: account
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
    controller.set('model.account', resolved.account);
    controller.set('model.cardMode', this.get('cardMode'));
    controller.set('model.saveCard', this.get('saveCard'));
  },

  actions: {
    /**
     * process various payment scenarios
     * break up to allow for clean seperation of isolate logic
     *
     */
    save: function () {
      var self = this;
      // var model = this.get('model');
      var controller = this.controllerFor(this.routeName);
      var model = controller.get('model');
      controller.set('model.isSpinning', true);
      // create a new check first then create the payment

      if (controller.isCash === true) {
        model.payment.mode = 'Cash';
        this.savePayment(model);
      } else if (controller.isCheck === true) {
        model.payment.mode = 'Check';
        this.saveCheck(model);
      } else {
        model.payment.mode = 'Credit';
        if (model.cardMode === 'file') {
          // use existing card, skip to the payment with file'd card in tow
          if (model.selectedCard) {
            model.payment.card = model.selectedCard;
          } else {
            this.get('notify').alert('Error: You must choose a credit card on file or enter a new card.');
            controller.set('model.isSpinning', false);
            return;
          }
          this.savePayment(model);
        } else {
          if (this.get('saveCard') === false) {
            // what do we do with a new credit card that we only want for this payment?
            // probably a custom jquery xhr request here
            // since we can't post a model w/ custom properties

            // setup the new card & payment to mirror what ember passes the api
            var newPayment = {
              payment: {
                amount: model.payment.amount,
                mode: 'Credit',
                account_id: model.account.id,
                cvc: model.newCard.cvc,
                name: model.newCard.nameOnCard,
                expiration_month: model.newCard.expirationMonth,
                expiration_year: model.newCard.expirationYear,
                number: model.newCard.number,
                vendor: model.newCard.vendor,
                address: model.newCard.address,
                zip: model.newCard.zip,
                is_debit: model.newCard.isDebit
              }
            };

            Ember.$.ajax({
              url: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/payments',
              type: "POST",
              data: JSON.stringify(newPayment),
              dataType: 'json',
              contentType: "application/json"
            }).then(function (response) {
              //create a local version of the newly created payment
              self.store.createRecord('payment', response);

              // reset the spinner no matter the result
              var controller = self.controllerFor(self.routeName);
              controller.set('model.isSpinning', false);

              //return to payments w/ alert
              self.get('notify').success('Success creating payment!');
              self.transitionTo('accounts.payments.info', model.account.id);

            }, function (reason) {
              // reset the spinner no matter the result
              var controller = self.controllerFor(self.routeName);
              controller.set('model.isSpinning', false);

              self.handleXHR(reason);
            });

          } else {
            // must be a new card
            this.saveNewFilePayment(model);
          }

        }

      }
    }
  },

  /**
   * save a check before passing on to save a regular payment
   * @param model
   */
  saveCheck: function (model) {
    var self = this;

    //todo validation data
    model.check.account = model.account;
    var check = this.store.createRecord('check', model.check);
    // check.set('date', new Date(inputs.date));

    check.save().then(function (post) {
      model.payment.check = post;
      self.savePayment(model);
    }, function (reason) {
      self.validationReport(check);
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
  saveNewFilePayment: function (model) {
    var self = this;

    // prep local variable
    var newCard = model.newCard;

    // set some default values on the newCard
    newCard.account = model.account;

    var newRecord = this.store.createRecord('card', newCard);
    newRecord.save().then(function (post) {
      self.get('notify').success('Card saved to your file');

      // update selected card to match the newly created card
      model.payment.card = newRecord;

      // update form to use new card on file
      // self.set('model.currentCard', newRecord);
      // self.set('mode', 'file');
      // self.controllerFor('billing.add-payment').send('toggleCredit', 'file');

      // now save the payment
      self.savePayment(model);

      // reset the spinner no matter the result
      var controller = self.controllerFor(self.routeName);
      controller.set('model.isSpinning', false);

      //return to payments w/ alert
      self.get('notify').success('Success creating payment!');
      self.transitionTo('accounts.payments.info', model.account.id);

    }, function (reason) {
      // roll back progress
      newRecord.deleteRecord();
      self.validationReport(newRecord);

      // reset the spinner no matter the result
      var controller = self.controllerFor(self.routeName);
      controller.set('model.isSpinning', false);
    });
  },

  /**
   * save a pre-made payment
   * break out to a small function for DRY
   *
   * @param model
   */
  savePayment: function (model) {
    var self = this;
    model.payment.account = model.account;
    var payment = this.store.createRecord('payment', model.payment);
    payment.save().then(function (post) {
      var id = model.account.get('id');
      self.get('notify').success('Success saving payment!');
      self.transitionTo('accounts.payments.info', id);
    }, function (reason) {
      // roll back payment
      payment.deleteRecord();
      // report error
      self.validationReport(payment);
      // reset the spinner no matter the result
      var controller = self.controllerFor(self.routeName);
      controller.set('model.isSpinning', false);
    });
  }
});
