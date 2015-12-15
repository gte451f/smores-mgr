import DS from 'ember-data';

export default DS.Model.extend({
  chargeTotal: DS.attr('number'),
  chargeCreatedOn: DS.attr('string'),
  chargeCount: DS.attr('number'),
  chargeDays: DS.attr('number'),
  paymentTotal: DS.attr('number'),
  paymentCreatedOn: DS.attr('string'),
  paymentCount: DS.attr('number'),
  paymentDays: DS.attr('number'),
  totalBalance: DS.attr('number'),

  // relationships
  account: DS.belongsTo('account', {async: false})
});
