import DS from 'ember-data';

export default DS.Model.extend({
    position: DS.attr('string'),

    // by way of user model
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    gender: DS.attr('string'),
    userType: DS.attr('string'),
    active: DS.attr('number'),


    //relationships
    user: DS.belongsTo('user', {
        async: false
    })
});
