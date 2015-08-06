import DS from 'ember-data';

export default DS.Model.extend({
    fee: DS.attr('number'),
    feeDescription: DS.attr('string'),

    // relationships
    location: DS.belongsTo('location'),
    program: DS.belongsTo('program'),
    session: DS.belongsTo('session'),
    cabin: DS.belongsTo('cabin')
});
