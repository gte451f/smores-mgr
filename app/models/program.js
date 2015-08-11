import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    fee: DS.attr('number'),
    description: DS.attr('string'),

    // relationships
    events: DS.hasMany('event', {
      async: false
    })
});
