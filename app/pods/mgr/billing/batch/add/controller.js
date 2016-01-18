import Ember from 'ember';
import ENV from 'smores-mgr/config/environment';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  session: Ember.inject.service(),
  notify: Ember.inject.service(),

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
  // is the save action in progress?
  isProcessing: false,

  availableAccounts: [],

  updateAccounts: Ember.observer('paymentRule', 'paymentDays', function () {
    var self = this;
    var rule = this.get('paymentRule');

    if (rule === 'days') {
      var days = '>' + this.get('paymentDays');
      Ember.$('#payment-days').removeClass("hidden");
      return this.store.find('account-billing-summary', {
        with: 'all',
        payment_days: days,
        total_balance: '>0'
      }).then(function (accounts) {
        self.set('availableAccounts', accounts);
      });
    } else {
      Ember.$('#payment-days').addClass("hidden");
      this.set('paymentDays', '*');
      return this.store.find('account-billing-summary', {
        with: 'all',
        total_balance: '>0',
        payment_count: '0'
      }).then(function (accounts) {
        self.set('availableAccounts', accounts);
      });
    }

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

      let minPaymentAmount = this.get('minPaymentAmount');
      let minPaymentType = this.get('minPaymentType');
      let selectedAccounts = this.get('selectedAccounts');

      // validate inputs
      if (selectedAccounts.length === 0) {
        this.get('notify').alert("You must choose at least one account to bill.");
        return false;
      }

      if (Ember.isEmpty(minPaymentType)) {
        this.get('notify').alert("You must choose a batch payment rule.");
        return false;
      }

      if (minPaymentAmount <= 0) {
        this.get('notify').alert('Amount to bill each account must not be blank.');
        return false;
      }

      var paymentBatch = {
        payment_batch: {
          min_type: minPaymentType,
          min_amount: minPaymentAmount,
          selectedAccounts: selectedAccounts.mapBy('id')
        }
      };

      this.set('isProcessing', true);
      Ember.$.ajax({
        url: ENV.APP.restDestination + '/v1/' + this.get('batchMode'),
        type: 'POST',
        headers: {'X-Authorization': 'Token: ' + session.token},
        data: JSON.stringify(paymentBatch),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).then(function (response) {
        self.set('isProcessing', false);
        let payment_batch = response.payment_batch[0];
        self.get('notify').success('Batch payment issued!');
        self.transitionTo('billing.batch.info', payment_batch.id);
      }, function (xhr, status, error) {
        self.set('isProcessing', false);
        self.handleXHR(xhr);
      });
    }
  }

});
