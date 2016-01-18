import Ember from 'ember';

export default Ember.Controller.extend({

  /**
   * calc total payments
   */
  paymentTotal: function () {
    var payments = this.get('model.payments');
    return payments.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('model.payments.@each.amount'),

  /**
   * calc total charges
   */
  chargeTotal: function () {
    var charges = this.get('model.charges');
    return charges.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('model.charges.@each.amount')

});

