import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    start: DS.attr('string'),
    end: DS.attr('string')

});
