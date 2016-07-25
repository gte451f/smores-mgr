import Ember from 'ember';
import ENV from 'smores-mgr/config/environment';

/**
 * consolidate logic to save payments (including with a new card)
 */
export default Ember.Mixin.create({
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),
  session: Ember.inject.service(),

  // have to save a copy of this locally for some reason
  amount: null,

  // where should the payment form return to when a payment is made?
  returnRoute: 'TO BE POPULATED BY ROUTE',
  returnRouteData: 'TO BE POPULATED BY ROUTE',

  // file|new
  // tell the system which way to process card data
  cardMode: 'file',

  // should the card be saved for future use
  saveCard: false,

  /**
   * logic to return to the correct originating route
   */
  returnWhenFinished: function () {
    let returnRoute = this.get('returnRoute');
    let returnRouteData = this.get('returnRouteData');

    if (Ember.isEmpty(returnRouteData)) {
      this.transitionTo(returnRoute);
    } else {
      this.transitionTo(returnRoute, returnRouteData);
    }
  },

  actions: {
    /**
     * process various payment scenarios
     * break up to allow for clean separation of isolated logic
     *
     */
    save: function () {
      var self = this;
      // var model = this.get('model');
      var controller = this.controllerFor(this.routeName);
      this.set('saveCard', controller.get('model.saveCard'));
      var model = controller.get('model');
      controller.set('model.isSpinning', true);

      // payment must have a positive amount
      // strip alpha chars from amount
      this.set('amount', model.payment.amount.replace(/[^\d.-]/g, ''));

      if (this.get('amount') <= 0) {
        this.get('notify').alert('Error: You must choose an amount greater than 0');
        controller.set('model.isSpinning', false);
        return;
      }

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
                amount: this.get('amount'),
                mode: 'Credit',
                account_id: model.account.id,
                cvc: model.newCard.cvc,
                name_on_card: model.newCard.nameOnCard,
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
              url: ENV.APP.restDestination + ENV.APP.restNameSpace + '/payments',
              type: "POST",
              data: JSON.stringify(newPayment),
              dataType: 'json',
              contentType: "application/json",
              headers: {'X-Authorization': 'Token: ' + this.get('session.data.authenticated.token')},
            }).then(function (response) {
              //create a local version of the newly created payment
              self.store.createRecord('payment', response);

              // reset the spinner no matter the result
              var controller = self.controllerFor(self.routeName);
              controller.set('model.isSpinning', false);

              //return to payments w/ alert
              self.get('notify').success('Success creating payment!');

              self.returnWhenFinished();

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
    var controller = self.controllerFor(self.routeName);

    // prep local variable
    var newCard = model.newCard;

    // set some default values on the newCard
    newCard.account = model.account;

    //validate card before proceeding
    var passedValidation = this.get('validateCredit').validateCard(newCard);
    if (passedValidation === false) {
      let errorMessage = this.get('validateCredit').getErrorMessages();
      this.get('notify').alert({html: errorMessage});
      controller.set('model.isSpinning', false);
      return;
    }

    var newRecord = this.store.createRecord('card', newCard);
    newRecord.save().then(function (post) {
      self.get('notify').success('Card saved to your file');
      // update selected card to match the newly created card
      model.payment.card = newRecord;
      // now save the payment
      self.savePayment(model);
      // reset the spinner no matter the result
      controller.set('model.isSpinning', false);
      //return to payments w/ alert
      self.get('notify').success('Success creating payment!');
      self.returnWhenFinished();
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

    payment.set('amount', this.get('amount'));
    payment.save().then(function (post) {
      // var id = model.account.get('id');
      self.get('notify').success('Success saving payment!');
      self.returnWhenFinished();
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
