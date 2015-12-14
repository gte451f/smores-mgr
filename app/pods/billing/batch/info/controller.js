import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Batch Info',

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
  }
});
