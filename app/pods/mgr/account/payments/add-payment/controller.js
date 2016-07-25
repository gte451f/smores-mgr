import Ember from 'ember';


/**
 * lots of custom work to control the pages toggle rules
 */
export default Ember.Controller.extend({
  breadCrumb: 'Add Payment',

  // text description of current mode
  // used to track toggle button
  mode: 'Credit',

  // boolean break down of current mode
  isCash: false,
  isCheck: false,
  isCredit: true,

  // button text that changes onClick
  toggleText: 'Use New Card',


  actions: {



  }
});
