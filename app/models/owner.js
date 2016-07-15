import DS from 'ember-data';
import { validator, buildValidations } from 'ember-cp-validations';

var Validations = buildValidations({
  firstName: {
    description: 'First Name',
    validators: [
      validator('presence', {presence: true, message: 'should not be empty'}),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  lastName: {
    description: 'Last Name',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  email: {
    validators: [
      validator('presence', true),
      validator('format', {
        regex: /\S+@\S+\.\S+/,
        type: 'email'
      })
    ]
  },
  relationship: {
    description: 'Relationship To Camper',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
  gender: {
    description: 'Gender',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 2,
        max: 25
      })
    ]
  },
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  primaryContact: DS.attr('number'),
  relationship: DS.attr('string'),

  // user fields
  email: DS.attr('string'),
  lastName: DS.attr('string'),
  firstName: DS.attr('string'),
  userName: DS.attr('string'),
  userType: DS.attr('string'),
  gender: DS.attr('string'),

  // relationshps
  account: DS.belongsTo('account', {
    async: false
  }),

  ownerNumbers: DS.hasMany('owner-number', {
    async: false
  })

});

