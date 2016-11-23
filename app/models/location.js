import DS from 'ember-data';

export default DS.Model.extend({
    addr_1: DS.attr('string'),
    addr_2: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    country: DS.attr('string'),
    zip: DS.attr('string'),
    name: DS.attr('string'),
    description: DS.attr('string'),

    // relationships
    events: DS.hasMany('event', {
      async: false
    })
});

