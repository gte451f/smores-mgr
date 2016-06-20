import DS from 'ember-data';
import Ember from 'ember';


export default DS.Model.extend({
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
