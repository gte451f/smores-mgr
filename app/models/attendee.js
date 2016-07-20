import DS from 'ember-data';
import Ember from 'ember';
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
  active: DS.attr('number'),
  schoolGrade: DS.attr('string'),
  dob: DS.attr('utcdate'),
  medicalNotes: DS.attr('string'),
  allergyNotes: DS.attr('string'),
  generalNotes: DS.attr('string'),

  //calculated
  fullName: Ember.computed('firstName', 'lastName', function () {
    var fullName = this.get('lastName') + ', ' + this.get('firstName');
    return Ember.$("<div/>").html(fullName).text();
  }),

  // by way of user
  email: DS.attr('string'),
  lastName: DS.attr('string'),
  firstName: DS.attr('string'),
  userType: DS.attr('string'),
  gender: DS.attr('string'),

  // relationships
  registrations: DS.hasMany('registration', {
    async: false
  }),
  account: DS.belongsTo('account', {async: true})
});
