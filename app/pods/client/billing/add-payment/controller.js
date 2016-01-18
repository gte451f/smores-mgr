import Ember from 'ember';


/**
 * lots of custom work to control the pages toggle rules
 */
export default Ember.Controller.extend({
  breadCrumb: 'Add Payment',

  // button text that changes onClick
  toggleText: 'Use New Card',

  actions: {
    /**
     * toggle between a card on file to a new card form
     */
    toggleCredit: function (mode) {
      Ember.$('#card-on-file').toggleClass("hidden");
      Ember.$('#new-credit-card').toggleClass("hidden");

      if (mode === 'file') {
        //switch from file to new
        this.set('toggleText', '<= Use Card On File');
        this.set('model.mode', 'new');
      } else {
        // switch from new to file
        this.set('toggleText', 'Use New Card');
        this.set('model.mode', 'file');
      }
    }
  }
});
