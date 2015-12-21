import DS from 'ember-data';

export default DS.Model.extend({
  active: DS.attr('string'),
  createdOn: DS.attr('date'),
  updatedOn: DS.attr('date'),
  notes: DS.attr('string'),
  name: DS.attr('string'),

  // relationships
  cards: DS.hasMany('card', {
    async: false
  }),
  attendees: DS.hasMany('attendee', {
    async: false
  }),
  accountAddrs: DS.hasMany('account-addr', {
    async: false
  }),
  owners: DS.hasMany('owner', {
    async: false
  }),
  charges: DS.hasMany('charge', {
    async: false
  }),
  payments: DS.hasMany('payment', {
    async: false
  })
});
