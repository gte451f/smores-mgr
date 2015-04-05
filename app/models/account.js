import DS from 'ember-data';

export default DS.Model.extend({
    userName: DS.attr('string'),
    password: DS.attr('string'),
    createdOn: DS.attr('date'),
    updatedOn: DS.attr('date'),
    name: DS.attr('string'),

    // relationships
    attendees: DS.hasMany('attendee'),
    accountAddrs: DS.hasMany('accountAddr'),
    owners: DS.hasMany('owner')
});
