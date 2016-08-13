import Ember from 'ember';
import FiscalDates from 'smores-mgr/mixins/billing/fiscal-dates';

const {
  Component
} = Ember;

export default Component.extend(FiscalDates, {
  init(){
    this._super(...arguments);
    this.set('selectedYear', this.getCurrentYear());
  },

  // store the currently selected year on the component
  selectedYear: null,
  adjustedAvailableYears: Ember.computed('availableYears', function () {
      let adjustedYears = [{display: 'All Years', value: 'All Years'}];
      this.get('availableYears').forEach(function (item) {
        adjustedYears.push({display: item, value: item});
      });
      return adjustedYears;
    }
  )
})
;
