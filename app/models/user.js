import DS from 'ember-data';

export default DS.Model.extend({
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    userType: DS.attr('string'),
    gender: DS.attr('string')

    // relationships
});
