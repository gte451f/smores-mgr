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

  /**
   * toggle check section
   * true means to enable or make this the active payment option
   *
   * @param status
   */
  toggleCheck: function (status) {
    var disabled = !status;
    Ember.$('#checkDate').prop("disabled", disabled);
    Ember.$('#checkDate').val("");
    Ember.$('#checkNumber').prop("disabled", disabled);
    Ember.$('#checkNumber').val("");
    this.set('isCheck', status);
    // toggle class
    if (status === true) {
      Ember.$('#check-panel').removeClass("hidden");
      Ember.$('#check-button').removeClass("btn-default");
      Ember.$('#check-button').addClass("btn-primary");
    } else {
      Ember.$('#check-panel').addClass("hidden");
      Ember.$('#check-button').removeClass("btn-primary");
      Ember.$('#check-button').addClass("btn-default");
    }

  },

  /**
   * toggle credit section
   * @param status
   */
  toggleCredit: function (status) {
    var disabled = !status;
    Ember.$('#cardOnFile').prop("disabled", disabled);
    Ember.$('#cardOnFile').val("");
    this.set('isCredit', status);

    // toggle class
    if (status === true) {
      Ember.$('#credit-panel').removeClass("hidden");
      Ember.$('#credit-button').removeClass("btn-default");
      Ember.$('#credit-button').addClass("btn-primary");

    } else {
      Ember.$('#credit-panel').addClass("hidden");
      Ember.$('#credit-button').removeClass("btn-primary");
      Ember.$('#credit-button').addClass("btn-default");
    }
  },

  /**
   * toggle cash section
   * @param status
   */
  toggleCash: function (status) {
    this.set('isCash', status);

    // toggle class
    if (status === true) {
      Ember.$('#cash-panel').removeClass("hidden");
      Ember.$('#cash-button').removeClass("btn-default");
      Ember.$('#cash-button').addClass("btn-primary");
    } else {
      Ember.$('#cash-panel').addClass("hidden");
      Ember.$('#cash-button').removeClass("btn-primary");
      Ember.$('#cash-button').addClass("btn-default");
    }
  },

  actions: {
    /**
     * catch request to activate credit payment
     */
    activateCredit: function () {
      this.set('mode', 'Credit');
      this.toggleCredit(true);
      this.toggleCheck(false);
      this.toggleCash(false);
    },

    /**
     * catch request to activate check payment
     */
    activateCheck: function () {
      this.set('mode', 'Check');
      this.toggleCredit(false);
      this.toggleCheck(true);
      this.toggleCash(false);
    },

    /**
     * catch request to activate cash payment
     */
    activateCash: function () {
      this.set('mode', 'Cash');
      this.toggleCash(true);
      this.toggleCredit(false);
      this.toggleCheck(false);
    },

    /**
     * toggle between a card on file to a new card form
     */
    toggleCredit: function (mode) {
      Ember.$('#card-on-file-form').toggleClass("hidden");
      Ember.$('#new-card-form').toggleClass("hidden");

      if (mode === 'file') {
        //switch from file to new
        this.set('toggleText', 'Use Card On File');
        this.set('model.cardMode', 'new');
      } else {
        // switch from new to file
        this.set('toggleText', 'Use New Card');
        this.set('model.cardMode', 'file');
      }
      console.log(this.get('model.cardMode'));
    }

  }
});
