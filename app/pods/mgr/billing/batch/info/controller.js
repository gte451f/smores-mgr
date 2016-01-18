import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  breadCrumb: 'Batch Info',
  notify: Ember.inject.service(),

  // get a list of failed payments as indicated by the lack of an external ID
  failedPayments: Ember.computed('model', function () {
    let result = this.get('model.payments').filter(function (item, index, enumerable) {
      return ( Ember.isEmpty(item.get('externalId')) ) ? true : false;
    });
    return result;
  }),

  // get a list of failed payments as indicated by the presence of an external ID
  successfulPayments: Ember.computed('model', function () {
    let result = this.get('model.payments').filter(function (item, index, enumerable) {
      return ( Ember.isEmpty(item.get('externalId')) ) ? false : true;
    });
    return result;
  }),

  actions: {
    /**
     * show/hide a payment box
     * @param id
     */
    togglePayments: function (id) {
      Ember.$('#' + id + '-hide').toggleClass("hidden");
      Ember.$('#' + id + '-show').toggleClass("hidden");
      // Ember.$('#' + id + '-payments').toggleClass("hidden");
      Ember.$('#' + id + '-payments').toggleClass("collapsed-box");
    },

    deleteBatch: function (batch) {
      var self = this;
      batch.destroyRecord().then(function () {
        self.get('notify').success('Successfully removed batch');
        self.transitionToRoute('billing.dash');
      }, function (reason) {
        // self.get('notify').error('Could not delete record!');
        let title = reason.errors.title;

        self.get('notify').alert(title);

      });
    }
  }
});
