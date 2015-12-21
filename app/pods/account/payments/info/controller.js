import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/controller';

export default Ember.Controller.extend({

  // calc the total amount of payments made for this family
  paymentTotal: Ember.computed('model.payments.@earch.amount', function () {
    var payments = this.get('model.payments');
    return payments.reduce(function (previousValue, payment) {
      return previousValue + payment.get("amount");
    }, 0);
  }),

  // calc the total amount of charges for this account
  chargeTotal: Ember.computed('model.charges.@earch.amount', function () {
    var charges = this.get('model.charges');
    return charges.reduce(function (previousValue, charge) {
      return previousValue + charge.get("amount");
    }, 0);
  })
});
