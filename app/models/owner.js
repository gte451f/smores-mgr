import DS from 'ember-data';

export default DS.Model.extend({

    // by way of owner
    email: DS.attr('string'),
    lastName: DS.attr('string'),
    firstName: DS.attr('string'),
    userName: DS.attr('string'),

    // relationshps
    account: DS.belongsTo('account')
});
