import DS from 'ember-data';

export default DS.Model.extend({
    minAge: DS.attr('number'),
    maxAge: DS.attr('number'),
    gender: DS.attr('string'),
    capacity: DS.attr('number'),
    name: DS.attr('string'),

    // relationships
    events: DS.hasMany('event')
});
