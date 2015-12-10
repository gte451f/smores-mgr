import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethod: DS.attr('string'),
  status: DS.attr('string'),
  amountFailed: DS.attr('number'),
  amountProcessed: DS.attr('number'),
  failCount: DS.attr('number'),
  successCount: DS.attr('number'),
  createdOn: DS.attr('date'),
  processedOn: DS.attr('date'),

  createdBy: DS.belongsTo('user', { async: true }),
  payments: DS.hasMany('request', {
    async: false
  })

});
