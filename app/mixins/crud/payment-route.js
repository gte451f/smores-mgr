import Ember from 'ember';
import ENV from 'smores-mgr/config/environment';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

/**
 * consolidate logic to save payments (including with a new card)
 * this mixin maxes several assumptions on what data is collected for use
 */
export default Ember.Mixin.create({
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),
  session: Ember.inject.service(),
  apiValidationHandler: Ember.inject.service(),

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
  returnWhenFinished: function (model) {
    let returnRoute = model.returnRoute;
    let returnRouteData = model.returnRouteData;

    if (Ember.isEmpty(returnRouteData)) {
      this.transitionTo(returnRoute);
    } else {
      this.transitionTo(returnRoute, returnRouteData);
    }
  },

  actions: {

    /**
     * handle payment save operations
     * delegate out to helper functions depending on the path the payment takes
     *
     * @param model
     */
    save(model){
      Ember.set(model, 'isPending', true);

      if (!model.newPayment.get('validations.isValid')) {
        this.get('notify').alert('Payment amount is required and must be between $5 and $10,000.');
      }

      if (model.mode === 'Cash') {
        Ember.set(model, 'newPayment.mode', 'Cash');
        this.savePayment(model);
      } else if (model.mode === 'Check') {
        if (model.newCheck.validations.isValid) {
          Ember.set(model, 'newPayment.mode', 'Check');
          this.saveCheck(model);
        } else {
          this.get('apiValidationHandler').handleLocalErrors(model.newCheck.get('validations.messages'));
          Ember.set(model, 'isPending', false);
        }
      } else {
        Ember.set(model, 'newPayment.mode', 'Credit');
        if (model.useNewCard === true) {
          if (model.newCard.validations.isValid) {
            if (model.saveNewCard === true) {
              this.saveNewFilePayment(model);
            } else {
              this.saveOneTimeCardPayment(model);
            }
          } else {
            this.get('apiValidationHandler').handleLocalErrors(model.newCard.get('validations.messages'));
            Ember.set(model, 'isPending', false);
          }
        } else {
          // use existing card, skip to the payment with file'd card in tow
          if (model.selectedCard) {
            Ember.set(model, 'newPayment.card', model.selectedCard);
          } else {
            this.get('notify').alert('Error: You must choose a credit card on file or enter a new card.');
            Ember.set(model, 'isPending', false);
            return;
          }
          this.savePayment(model);
        }
      }
    }
  },

  /**
   * save a check before passing on to save a regular payment
   * @param model
   */
  saveCheck (model) {
    var newCheck = model.newCheck;
    newCheck.set('account', model.account);
    newCheck.save().then(()=> {
      Ember.set(model, 'newPayment.check', newCheck);
      this.savePayment(model);
    }, (reason) => {
      // report error
      this.handleFormError(reason);
      // reset the spinner no matter the result
      Ember.set(model, 'isPending', false);
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
  saveNewFilePayment (model) {
    // prep local variable with some values
    var newCard = model.newCard;
    newCard.set('account', model.account);

    newCard.save().then(() => {
      this.get('notify').success('Card saved to your file');
      // update selected card to match the newly created card
      Ember.set(model, 'newPayment.card', newCard);
      // now save the payment
      this.savePayment(model);
    }, (reason) => {
      // report error
      this.handleFormError(reason);
      // reset the spinner no matter the result
      Ember.set(model, 'isPending', false);
    });
  },


  // what do we do with a new credit card that we only want for this payment?
  // probably a custom jquery xhr request here
  // since we can't post a model w/ custom properties
  saveOneTimeCardPayment(model){
    // setup the new card & payment to mirror what ember passes the api
    var newPayment = {
      data: {
        attributes: {
          amount: model.newPayment.get('amount'),
          mode: 'Credit',
          cvc: model.newCard.get('cvc'),
          name_on_card: model.newCard.get('nameOnCard'),
          expiration_month: model.newCard.get('expirationMonth'),
          expiration_year: model.newCard.get('expirationYear'),
          number: model.newCard.get('number'),
          vendor: model.newCard.get('vendor'),
          address: model.newCard.get('address'),
          zip: model.newCard.get('zip'),
          is_debit: model.newCard.get('isDebit')
        },
        relationships: {
          account: {type: 'accounts', id: model.account.id}
        },
        type: "payments"
      }
    };

    Ember.$.ajax({
      url: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/payments',
      type: "POST",
      data: JSON.stringify(newPayment),
      dataType: 'json',
      contentType: "application/json",
      headers: {'X-Authorization': 'Token: ' + this.get('session.data.authenticated.data.attributes.token')},
    }).then((response)=> {
      //create a local version of the newly created payment
      this.store.createRecord('payment', response);

      Ember.set(model, 'isPending', false);
      //return to payments w/ alert
      this.get('notify').success('Success creating payment!');
      this.returnWhenFinished();

    }, (reason) => {
      // report error
      this.handleFormError(reason);
      // reset the spinner no matter the result
      Ember.set(model, 'isPending', false);
    });
  },

  /**
   * save a pre-made payment
   * break out to a small function for DRY
   *
   * @param model
   */
  savePayment (model) {
    var payment = model.newPayment;
    payment.set('account', model.account);
    payment.save().then(() => {
      // var id = model.account.get('id');
      this.get('notify').success('Success saving payment!');
      Ember.set(model, 'isPending', false);
      this.returnWhenFinished(model);
    }, function (reason) {
      // report error
      this.handleFormError(reason);
      // reset the spinner no matter the result
      Ember.set(model, 'isPending', false);
    });
  }
});
