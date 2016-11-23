import DS from 'ember-data';

export default DS.Model.extend({
  priority: DS.attr('number'),
  attending: DS.attr('number'),
  submitStatus: DS.attr('string'),
  note: DS.attr('string'),

  // relationships
  event: DS.belongsTo('event', {async: false}),
  registration: DS.belongsTo('registration', {
    async: false
  })
});

