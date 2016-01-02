import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethod: DS.attr('string'),
  status: DS.attr('string'),
  amountFailed: DS.attr('number'),
  amountProcessed: DS.attr('number'),
  failCount: DS.attr('number'),
  successCount: DS.attr('number'),
  createdOn: DS.attr('utcdate'),
  processedOn: DS.attr('utcdate'),
  log: DS.attr('string'),

  createdBy: DS.belongsTo('user', { async: true }),
  payments: DS.hasMany('payment', {
    async: false
  })

});
