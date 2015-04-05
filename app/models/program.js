import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    cost: DS.attr('number'),
    description: DS.attr('string')
});
