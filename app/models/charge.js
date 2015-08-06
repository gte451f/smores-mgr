import DS from 'ember-data';

export default DS.Model.extend({
    amount: DS.attr('number'),
    name: DS.attr('string'),
    createdOn: DS.attr('string'),

    //relationships
    request: DS.belongsTo('request', {async: true}),
    registration: DS.belongsTo('registration', {async: true}),
    user: DS.belongsTo('user', {async: true}),
    fee: DS.belongsTo('fee'),
    account: DS.belongsTo('account')
});
