import DS from 'ember-data';

export default DS.Model.extend({
    start: DS.attr('date'),
    end: DS.attr('date'),
    minAge: DS.attr('number'),
    maxAge: DS.attr('number'),
    gender: DS.attr('string'),
    capacity: DS.attr('number'),
    cost: DS.attr(number)
});
