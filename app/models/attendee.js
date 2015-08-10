import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('number'),
    schoolGrade: DS.attr('string'),
    dob: DS.attr('string'),

    //calculated
    fullName: function () {
        var fullName = this.get('lastName') + ', ' + this.get('firstName');
        return Ember.$("<div/>").html(fullName).text();
    }.property('firstName', 'lastName'),

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
