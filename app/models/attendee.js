import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('number'),
    schoolGrade: DS.attr('string'),
    dob: DS.attr('string'),

    // by way of user
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    userType: DS.attr('string'),
    gender: DS.attr('string'),

    // relationships
    registrations: DS.hasMany('registration'),
    account: DS.belongsTo('account', {async: true})
});
