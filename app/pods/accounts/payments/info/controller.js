import Ember from 'ember';

export default Ember.Controller.extend({


    // calc the total amount of payments made for this family
    paymentTotal: function () {
        var payments = this.get('model.payments');
        return payments.reduce(function(previousValue, payment){
            return previousValue + payment.get("amount");
        }, 0);
    }.property('model.payments.@earch.amount'),

    // calc the total amount of charges for this account
    chargeTotal: function () {
        var charges = this.get('model.charges');
        return charges.reduce(function(previousValue, charge){
            return previousValue + charge.get("amount");
        }, 0);
    }.property('model.charges.@earch.amount')
});
