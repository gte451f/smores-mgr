import DS from 'ember-data';

export default DS.Model.extend({
    primaryContact: DS.attr('number'),
    relationship: DS.attr('string'),

    // user fields
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    userName: DS.attr('string'),
    userType: DS.attr('string'),
    gender: DS.attr('string'),

    // relationshps
    account: DS.belongsTo('account', {
      async: false
    })
});
