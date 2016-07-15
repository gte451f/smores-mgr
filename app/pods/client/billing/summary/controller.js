import Ember from 'ember';
import moment from 'moment';

export default Ember.Controller.extend({

  allEntries: 'All Years',

  selectedYear: 'All Years',

  availableYears: Ember.computed(function () {
    let years = [this.get('allEntries')];
    let year = moment().year();
    let i = 0;
    for (i = 0; i < 15; i++) {
      years.push(year - i);
    }
    return years;
  }),

  activePayments: null,
  activeCharges: null,

  yearChanged: Ember.observer('selectedYear', function () {
    let selectedYear = this.get('selectedYear');
    let model = this.get('model');

    if (selectedYear === this.get('allEntries')) {
      this.set('activePayments', model.get('payments'));
      this.set('activeCharges', model.get('charges'));
    } else {

      let activeCharges = model.get('charges').filter(function (item) {
        if (this.get('selectedYear') === moment(item.get('createdOn')).year()) {
          return true;
        } else {
          return false;
        }
      }, this);

      let activePayments = model.get('payments').filter(function (item) {
        if (this.get('selectedYear') === moment(item.get('createdOn')).year()) {
          return true;
        } else {
          return false;
        }
      }, this);

      this.set('activeCharges', activeCharges);
      this.set('activePayments', activePayments);

    }
  }),

  /**
   * calc total payments
   */
  paymentTotal: function () {
    var payments = this.get('activePayments');
    return payments.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('this.activePayments.@each.amount'),

  /**
   * calc total charges
   */
  chargeTotal: function () {
    var charges = this.get('activeCharges');
    return charges.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('this.activeCharges.@each.amount')

});


