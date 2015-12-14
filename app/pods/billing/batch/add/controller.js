import Ember from 'ember';
import ENV from 'smores-mgr/config/environment';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  session: Ember.inject.service(),

  breadCrumb: 'New Batch',

  // is the form saving a payment or statement batch?
  batchMode: 'payment_batches',
  // how will the availableAccount list be built?
  paymentRule: null,
  // how many days back should account filter go?
  paymentDays: '*',
  minPaymentAmount: null,
  minPaymentType: 'Flat',
  minPaymentNotes: 'in dollars',
  // all all accounts selected?
  allSelected: false,

  availableAccounts: [],

  updateAccounts: Ember.observer('paymentRule', function () {
    var self = this;
    var rule = this.get('paymentRule');

    if (rule === 'days') {
      Ember.$('#payment-days').removeClass("hidden");
    } else {
      Ember.$('#payment-days').addClass("hidden");
      this.set('paymentDays', '*');
    }

    return this.store.find('account', {limit: 10}).then(function (accounts) {
      self.set('availableAccounts', accounts);
    });
  }),

  updateMinPayment: Ember.observer('minPaymentType', function () {
    var type = this.get('minPaymentType');
    if (type === 'Flat') {
      this.set('minPaymentNotes', 'in dollars');
    } else {
      this.set('minPaymentNotes', 'as % of balance');
    }
  }),

  /**
   * begin section storing multi select accounts
   */
  selectedAccounts: [],

  actions: {
    /**
     * will toggle to include or remove an account from the list to be batched
     * @param account
     */
    toggleAccount: function (account) {
      var selectedAccounts = this.get('selectedAccounts');
      if (selectedAccounts.contains(account)) {
        selectedAccounts = selectedAccounts.without(account);
      } else {
        selectedAccounts.push(account);
      }
      this.set('selectedAccounts', selectedAccounts);
    },

    /**
     * will include all available accounts into the selected array
     * or remove all available accounts
     */
    toggleAllAccounts: function () {
      var allSelected = this.get('allSelected');
      if (allSelected === false) {
        this.set('selectedAccounts', []);
        this.get('availableAccounts').forEach(function (account) {
          account.set('isSelected', false);
        });
      } else {
        var selectedAccounts = [];
        this.get('availableAccounts').forEach(function (account) {
          account.set('isSelected', true);
          selectedAccounts.push(account);
        });
        this.set('selectedAccounts', selectedAccounts);
      }
    },

    /**
     * change the form from saving one type of batch to another
     */
    toggleBatchMode: function (batchMode) {

      if (batchMode === 'statement_batches') {
        this.set('batchMode', 'statement_batches');
        Ember.$('#statement-button').addClass("btn-primary");
        Ember.$('#batch-button').removeClass("btn-primary");
      } else {
        this.set('batchMode', 'payment_batches');
        Ember.$('#batch-button').addClass("btn-primary");
        Ember.$('#statement-button').removeClass("btn-primary");
      }
      this.set('batch_mode', batchMode);
    },

    /**
     * run a custom save since several aspects of this request are not part of the endpoint fields
     */
    save: function () {
      var self = this;
      var session = this.get('session.data.authenticated');

      var paymentBatch = {
        payment_batch: {
          min_type: this.get('minPaymentType'),
          min_amount: this.get('minPaymentAmount'),
          selectedAccounts: this.get('selectedAccounts').mapBy('id')
        }
      };

      Ember.$.ajax({
        url: ENV.APP.restDestination + '/v1/' + this.get('batchMode'),
        type: 'POST',
        headers: {'X-Authorization': 'Token: ' + session.token},
        data: JSON.stringify(paymentBatch),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).then(function (response) {
        debugger;
      }, function (xhr, status, error) {
        self.handleXHR(xhr);
      });
    }
  }

});
