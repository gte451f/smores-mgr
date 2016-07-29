import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

var Validations = buildValidations({
  nameOnCard: {
    description: 'Name On Card',
    validators: [
      validator('presence', {presence: true, message: 'Card Name is required'}),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  isDebit: {
    description: 'Is this a debit card?',
    validators: [
      validator('presence', true),
    ]
  },
  allowReoccuring: {
    description: 'Can this card be used for re-occuring charges?',
    validators: [
      validator('presence', true),
      validator('number', {
        allowBlank: false,
        integer: true,
        gte: 0,
        lte: 1
      })
    ]
  },
  vendor: {
    description: 'Card Vendor',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  expirationMonth: {
    description: 'Expiration Month',
    validators: [
      validator('presence', true),
      validator('number', {
        allowBlank: false,
        integer: true,
        gte: 1,
        lte: 12
      })
    ]
  },
  expirationYear: {
    description: 'Expiration Year',
    validators: [
      validator('presence', true),
      validator('number', {
        allowBlank: false,
        integer: true,
        gte: 2016,
        lte: 2020
      })
    ]
  },
  cvc: {
    description: 'Card Verification Code',
    validators: [
      validator('number', {
        allowBlank: false,
        allowString: true,
        integer: true,
        gte: 100,
        lte: 9999,
        positive: true
      })
    ]
  },
  number: {
    description: 'Card Number',
    validators: [
      validator('number', {
        allowBlank: false,
        allowString: true,
        integer: true,
        positive: true
      })
    ]
  }
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  externalId: DS.attr('string'),
  createdOn: DS.attr('string'),
  allowReoccuring: DS.attr('number'),
  expirationMonth: DS.attr('string'),
  expirationYear: DS.attr('string'),
  nameOnCard: DS.attr('string'),
  number: DS.attr('string'),
  vendor: DS.attr('string'),
  isDebit: DS.attr('number'),
  active: DS.attr('number'),

  // faux values that we don't actually store but pass on to the credit card company
  cvc: DS.attr('number'),
  zip: DS.attr('string'),
  address: DS.attr('string'),

  // relationships
  account: DS.belongsTo('account', {
    async: false
  }),
  payments: DS.hasMany('payment', {
    async: false
  })
});

