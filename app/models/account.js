import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('string'),
    createdOn: DS.attr('date'),
    updatedOn: DS.attr('date'),
    notes: DS.attr('string'),

    // relationships
    cards: DS.hasMany('card'),
    attendees: DS.hasMany('attendee'),
    accountAddrs: DS.hasMany('accountAddr'),
    owners: DS.hasMany('owner'),
    charges: DS.hasMany('charge'),
    payments: DS.hasMany('payment')
});
