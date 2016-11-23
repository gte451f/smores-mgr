import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * verify that the service is accessible and that the store has been injected
   */
  logMe: function () {
    console.log('service available');
    var store = this.get('store');
    store.query('employee');
  },

  gender: [
    {display: "Female", value: 'Female'},
    {display: "Male", value: 'Male'}
  ],

  ownerRelationship: [
    {label: "Mother", value: 'Mother'},
    {label: "Father", value: 'Father'},
    {label: "Guardian", value: 'Guardian'},
    {label: "Grand Parent", value: 'Grand Parent'},
    {label: "Other", value: 'Other'}
  ],

  ownerNumberType: [
    {label: "Mobile", value: 'Mobile'},
    {label: "Office", value: 'Office'},
    {label: "Home", value: 'Home'},
    {label: "Other", value: 'Other'}
  ],

  grade: [
    {display: "Pre-K", value: 'Pre-K'},
    {display: "Kindergarten", value: 'Kindergarten'},
    {display: "1st", value: '1st'},
    {display: "2nd", value: '2nd'},
    {display: "3rd", value: '3rd'},
    {display: '4th', value: '4th'},
    {display: '5th', value: '5th'},
    {display: '6th', value: '6th'},
    {display: '7th', value: '7th'},
    {display: '8th', value: '8th'},
    {display: '9th', value: '9th'},
    {display: '10th', value: '10th'},
    {display: '11th', value: '11th'},
    {display: '12th', value: '12th'}
  ],

  monthNumber: [
    {label: 'January', value: 1},
    {label: 'February', value: 2},
    {label: 'March', value: 3},
    {label: 'April', value: 4},
    {label: 'May', value: 5},
    {label: 'June', value: 6},
    {label: 'July', value: 7},
    {label: 'August', value: 8},
    {label: 'September', value: 9},
    {label: 'October', value: 10},
    {label: 'November', value: 11},
    {label: 'December', value: 12},
  ],

  americanStates: [
    {label: 'Alabama', value: 'Alabama', order: 1},
    {label: 'Alaska', value: 'Alaska', order: 2},
    {label: 'Arizona', value: 'Arizona', order: 3},
    {label: 'Arkansas', value: 'Arkansas', order: 4},
    {label: 'California', value: 'California', order: 5},
    {label: 'Colorado', value: 'Colorado', order: 6},
    {label: 'Connecticut', value: 'Connecticut', order: 7},
    {label: 'Delaware', value: 'Delaware', order: 8},
    {label: 'Florida', value: 'Florida', order: 9},
    {label: 'Georgia', value: 'Georgia', order: 10},
    {label: 'Hawaii', value: 'Hawaii', order: 11},
    {label: 'Idaho', value: 'Idaho', order: 12},
    {label: 'Illinois', value: 'Illinois', order: 13},
    {label: 'Indiana', value: 'Indiana', order: 14},
    {label: 'Iowa', value: 'Iowa', order: 15},
    {label: 'Kansas', value: 'Kansas', order: 16},
    {label: 'Kentucky', value: 'Kentucky', order: 17},
    {label: 'Louisiana', value: 'Louisiana', order: 18},
    {label: 'Maine', value: 'Maine', order: 19},
    {label: 'Maryland', value: 'Maryland', order: 20},
    {label: 'Massachusetts', value: 'Massachusetts', order: 21},
    {label: 'Michigan', value: 'Michigan', order: 22},
    {label: 'Minnesota', value: 'Minnesota', order: 23},
    {label: 'Mississippi', value: 'Mississippi', order: 24},
    {label: 'Missouri', value: 'Missouri', order: 25},
    {label: 'Montana', value: 'Montana', order: 26},
    {label: 'Nebraska', value: 'Nebraska', order: 27},
    {label: 'Nevada', value: 'Nevada', order: 28},
    {label: 'New Hampshire', value: 'New Hampshire', order: 29},
    {label: 'New Jersey', value: 'New Jersey', order: 30},
    {label: 'New Mexico', value: 'New Mexico', order: 31},
    {label: 'New York', value: 'New York', order: 32},
    {label: 'North Carolina', value: 'North Carolina', order: 33},
    {label: 'North Dakota', value: 'North Dakota', order: 34},
    {label: 'Ohio', value: 'Ohio', order: 35},
    {label: 'Oklahoma', value: 'Oklahoma', order: 36},
    {label: 'Oregon', value: 'Oregon', order: 37},
    {label: 'Pennsylvania', value: 'Pennsylvania', order: 38},
    {label: 'Rhode Island', value: 'Rhode Island', order: 39},
    {label: 'South Carolina', value: 'South Carolina', order: 40},
    {label: 'South Dakota', value: 'South Dakota', order: 41},
    {label: 'Tennessee', value: 'Tennessee', order: 42},
    {label: 'Texas', value: 'Texas', order: 43},
    {label: 'Utah', value: 'Utah', order: 44},
    {label: 'Vermont', value: 'Vermont', order: 45},
    {label: 'Virginia', value: 'Virginia', order: 46},
    {label: 'Washington', value: 'Washington', order: 47},
    {label: 'West Virginia', value: 'West Virginia', order: 48},
    {label: 'Wisconsin', value: 'Wisconsin', order: 49},
    {label: 'Wyoming', value: 'Wyoming', order: 50}
  ],

  boolean: [
    {name: 'True', value: 1},
    {name: 'False', value: 0}
  ],

  regStatus: [
    {label: 'New', value: 'New'},
    {label: 'Pending', value: 'Pending'},
    {label: 'Waitlist', value: 'Waitlist'},
    {label: 'Confirmed', value: 'Confirmed'},
    {label: 'Canceled', value: 'Canceled'}
  ],

  /**
   * Fee related lists
   */

  feeBasis: [
    {label: 'Account', value: 'Account'},
    {label: 'Registration', value: 'Registration'},
    {label: 'Request', value: 'Request'},
    {label: 'Attendee', value: 'Attendee'}
  ],

  feePaymentSchedule: [
    {label: 'Upfront', value: 'Upfront'},
    {label: 'Deferred', value: 'Deferred'}
  ],

  /**
   * Credit Card Related lists
   */
  cardVendor: [
    {label: 'American Express', value: 'amex'},
    {label: 'Visa', value: 'visa'},
    {label: 'Master Card', value: 'mastercard'},
    {label: 'Discover', value: 'discover'}
  ],

  cardExpirationYear: [
    {label: '2016', value: 2016},
    {label: '2017', value: 2017},
    {label: '2018', value: 2018},
    {label: '2019', value: 2019},
    {label: '2020', value: 2020},
    {label: '2021', value: 2021}
  ]
});
