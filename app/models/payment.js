import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  externalId: DS.attr('string'),
  createdOn: DS.attr('string'),
  settledOn: DS.attr('string'),
  amount: DS.attr('number'),
  mode: DS.attr('string'),

  //calc to include both refund and credit, basically is this a charge against a credit card
  isChargeCard: Ember.computed('mode', function () {
    if (this.get('mode') === 'credit' || this.get('mode') === 'refund') {
      return true;
    } else {
      return false;
    }
  }),

  isRefund: Ember.computed('mode', function () {
    if (this.get('mode') === 'refund') {
      return true;
    } else {
      return false;
    }
  }),

  // relationships
  account: DS.belongsTo('account', {
    async: false
  }),
  card: DS.belongsTo('card', {
    async: false
  }),
  check: DS.belongsTo('check', {
    async: false
  })
})
;
