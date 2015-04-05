import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('boolean'),
    schoolGrade: DS.attr('string'),
    dob: DS.attr('date'),

    // by way of user
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),

    // relationships
    registrations: DS.hasMany('registration', {async: true}),
    account: DS.belongsTo('account')
});
