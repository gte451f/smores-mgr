import DS from 'ember-data';

export default DS.Model.extend({
    position: DS.attr('string'),

    // user fields
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    userType: DS.attr('string'),
    gender: DS.attr('string'),
    password: DS.attr('string'),
    active: DS.attr('string')

});
