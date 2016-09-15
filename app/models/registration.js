import DS from 'ember-data';
import Ember from 'ember';

const {computed} = Ember;

export default DS.Model.extend({
  notes: DS.attr('string'),
  createdOn: DS.attr('string'),
  updatedOn: DS.attr('string'),

  // relationshps
  attendee: DS.belongsTo('attendee', {
    async: false
  }),
  account: DS.belongsTo('account', {
    async: false
  }),
  charges: DS.hasMany('charge', {async: true}),

  // why did I do this?
  // user: DS.belongsTo('user'),
  requests: DS.hasMany('request', {
    async: false
  })
});

