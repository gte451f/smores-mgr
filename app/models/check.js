import DS from 'ember-data';

export default DS.Model.extend({
    number: DS.attr('string'),
    date: DS.attr('date'),
    accountNumber: DS.attr('string'),
    routingNumber: DS.attr('string'),
    nameOnCheck: DS.attr('string'),

    //relationships
    account: DS.belongsTo('account'),
    payment: DS.hasMany('payment')
});
