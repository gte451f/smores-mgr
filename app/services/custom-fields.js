import Ember from 'ember';

export default Ember.Service.extend({
  init: function () {
    this.set('registrationFields', [{name: 'color', type: 'string'}, {name: 'tshirt', type: 'string'}]);
  },
  registrationFields: [],
  subjectFields: []
});
