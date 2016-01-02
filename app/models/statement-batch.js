import DS from 'ember-data';

export default DS.Model.extend({
  paymentMethod: DS.attr('string'),
  status: DS.attr('string'),
  createdOn: DS.attr('utcdate'),
  log: DS.attr('string'),

  createdBy: DS.belongsTo('user', {async: true})

});
