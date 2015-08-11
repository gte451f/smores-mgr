import DS from 'ember-data';

export default DS.Model.extend({
    externalId: DS.attr('string'),
    createdOn: DS.attr('string'),
    allowReoccuring: DS.attr('number'),
    expirationMonth: DS.attr('string'),
    expirationYear: DS.attr('string'),
    nameOnCard: DS.attr('string'),
    number: DS.attr('string'),
    vendor: DS.attr('string'),
    isDebit: DS.attr('number'),
    active: DS.attr('number'),

    // relationships
    account: DS.belongsTo('account', {
      async: false
    }),
    payments: DS.hasMany('payment', {
      async: false
    })
});
