import DS from 'ember-data';

export default DS.Model.extend({
    notes: DS.attr('string'),

    //relationshps
    attendee: DS.belongsTo('attendee', {async: true})
});
