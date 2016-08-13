import Ember from 'ember';
import moment from 'moment';

/**
 * a very simple mixin to store teh dates when a camp season begins and ends
 * this class might expand to calculate other dates related to the business...
 */
export default Ember.Mixin.create({
  // the last day in a camping year
  getYearEnd: function (year) {
    return new Date("August, 31, " + year);
  },

  // the first day in a camping year
  getYearStart: function (year) {
    return new Date("September, 1, " + year);
  },

  // what is the current fiscal year?
  getCurrentYear(){
    let year = parseInt(moment().format('YYYY'));
    let month = parseInt(moment().format('MM'));

    if (month >= 9) {
      return year + 1;
    } else {
      return year;
    }
  },

  // pull a list of recent years to use when looking at billing history
  availableYears: Ember.computed(function () {
    let years = [];
    let year = this.getCurrentYear();
    let i = 0;
    for (i = 0; i < 15; i++) {
      years.push(year - i);
    }
    return years;
  })
});
