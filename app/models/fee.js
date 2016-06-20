import DS from 'ember-data';

export default DS.Model.extend({
    name: DS.attr('string'),
    description: DS.attr('string'),
    amount: DS.attr('number'),
    basis: DS.attr('string'),
    paymentSchedule: DS.attr('string')

});

