import DS from 'ember-data';
import {validator, buildValidations} from 'ember-cp-validations';

var Validations = buildValidations({
  number: {
    description: 'Phone Number',
    validators: [
      validator('presence', {presence: true}),
      validator('format', {
        allowBlank: false,
        type: 'phone'
      })
    ]
  },
  phoneType: {
    description: 'Phone Type',
    validators: [
      validator('presence', true),
      validator('length', {
        min: 4,
        max: 10
      })
    ]
  },
}, {
  debounce: 500
});

export default DS.Model.extend(Validations, {
  phoneType: DS.attr('string'),
  primary: DS.attr('number'),
  number: DS.attr('string'),

  //relationships
  owner: DS.belongsTo('owner', {
    async: false
  })
});
