import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';
import moment from 'moment';
import Ember from 'ember';

const {computed} = Ember;

var Validations = buildValidations({
  date: {
    description: 'Check Date',
    validators: [
      validator('presence', true),
      validator('date', {
        before: 'now',
        after: computed(function () {
          return moment().subtract(1, 'years').format('YYYY-MM-DD');
        }).volatile(),
        message: function (type, value, context) {
          if (type === 'before') {
            return "The check date must be on or before today's date.";
          }
          if (type === 'after') {
            return 'Check day should be within the last year.';
          }
        }
      })
    ]
  },
  number: {
    description: 'Check Number',
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
  number: DS.attr('string'),
  date: DS.attr('utcdate'),
  accountNumber: DS.attr('string'),
  routingNumber: DS.attr('string'),
  nameOnCheck: DS.attr('string'),

  //relationships
  account: DS.belongsTo('account', {
    async: false
  }),
  payment: DS.hasMany('payment', {
    async: false
  })
});

