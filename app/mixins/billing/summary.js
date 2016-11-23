import Ember from 'ember';
import FiscalDates from 'smores-mgr/mixins/billing/fiscal-dates';
import moment from 'moment';

/**
 * helper class used to calculate custom date ranges
 * also observe select box and update common billing summary lists
 *
 */
export default Ember.Mixin.create(FiscalDates, {

  // set a default property
  init(){
    this._super(...arguments);

    // run this later so observer will catch it
    Ember.run.schedule('actions', this, function () {
      this.set('selectedYear', this.getCurrentYear());
    });
  },

  // values to drive year filter
  // route depends on these as well
  allEntries: 'All Years',
  selectedYear: null,
  // store the list of currently selected charges and payments
  activePayments: null,
  activeCharges: null,

  yearChanged: Ember.observer('selectedYear', function () {
    this.updateActiveLists();
  }),

  /**
   * rebuild the list of payments and charges for the currently selected year
   */
  updateActiveLists() {
    let selectedYear = this.get('selectedYear');
    let model = this.get('model');

    if (model) {
      if (selectedYear === this.get('allEntries')) {
        this.set('activePayments', model.get('payments'));
        this.set('activeCharges', model.get('charges'));
      } else {
        let lastYear = selectedYear - 1;
        var fiscalYearStart = this.getYearStart(lastYear);
        var fiscalYearEnd = this.getYearEnd(selectedYear);

        let activeCharges = model.get('charges').filter(function (item) {
          let chargeYear = new Date(moment(item.get('createdOn')));
          if (fiscalYearStart < chargeYear && fiscalYearEnd > chargeYear) {
            return true;
          } else {
            return false;
          }
        }, this);

        let activePayments = model.get('payments').filter(function (item) {
          let paymentYear = new Date(moment(item.get('createdOn')));
          if (fiscalYearStart < paymentYear && fiscalYearEnd > paymentYear) {
            return true;
          } else {
            return false;
          }
        }, this);

        this.set('activeCharges', activeCharges);
        this.set('activePayments', activePayments);
      }
    }
  },


  /**
   * calc total payments
   */
  paymentTotal: function () {
    var payments = this.get('activePayments');
    if (Ember.isEmpty(payments)) {
      return 0;
    }
    return payments.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('this.activePayments.@each.amount'),

  /**
   * calc total charges
   */
  chargeTotal: function () {
    var charges = this.get('activeCharges');
    if (Ember.isEmpty(charges)) {
      return 0;
    }
    return charges.reduce(function (previousValue, item, index, enumerable) {
      return previousValue + item.get('amount');
    }, 0);
  }.property('this.activeCharges.@each.amount'),

  /**
   * calc remaining balance
   */
  remainingBalance: function () {
    var charges = this.get('chargeTotal');
    var payments = this.get('paymentTotal');
    return charges - payments;

  }.property('this.activePayments.@each.amount', 'this.activeCharges.@each.amount'),

  // mutate local controller property from comp
  changeYear(year){
    this.set('selectedYear', year);
  },

  actions: {
    // mutate local controller property from comp
    changeYear(year){
      this.set('selectedYear', year);
    }
  }

});
