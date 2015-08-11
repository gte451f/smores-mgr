import DS from 'ember-data';

export default DS.Model.extend({
    fee: DS.attr('number'),
    feeDescription: DS.attr('string'),

    // relationships
    location: DS.belongsTo('location', {
      async: false
    }),
    program: DS.belongsTo('program', {
      async: false
    }),
    session: DS.belongsTo('session', {
      async: false
    }),
    cabin: DS.belongsTo('cabin', {
      async: false
    })
});
