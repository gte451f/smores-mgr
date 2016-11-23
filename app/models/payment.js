import Ember from 'ember';
import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

var Validations = buildValidations({
  amount: {
    description: 'Amount',
    validators: [
      validator('number', {
        allowBlank: false,
        allowString: true,
        integer: true,
        positive: true,
        gte: 5,
        let: 10000
      })
    ]
  }
}, {
  debounce: 500
});


export default DS.Model.extend(Validations, {
  externalId: DS.attr('string'),
  createdOn: DS.attr('string'),
  settledOn: DS.attr('string'),
  amount: DS.attr('number'),
  mode: DS.attr('string'),
  status: DS.attr('string'),

  //calc to include both refund and credit, basically is this a charge against a credit card
  isChargeCard: Ember.computed('mode', function () {
    if (this.get('mode') === 'Credit' || this.get('mode') === 'Refund') {
      return true;
    } else {
      return false;
    }
  }),

  isRefund: Ember.computed('mode', function () {
    if (this.get('mode') === 'Refund') {
      return true;
    } else {
      return false;
    }
  }),

  // relationships
  account: DS.belongsTo('account', {
    async: false
  }),
  card: DS.belongsTo('card', {
    async: false
  }),
  check: DS.belongsTo('check', {
    async: false
  }),
  paymentBatch: DS.belongsTo('payment-batch', {
    async: false
  })
})
;

