import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      paymentBatches: this.store.findAll('payment-batch'),
      statementBatches: this.store.findAll('statement-batch'),
    });

  },

  setupController(controller, resolved)
  {
    var model = {};
    this._super(controller, model);

    controller.set('paymentBatches', resolved.paymentBatches);
    controller.set('paymentBatches', resolved.statementBatches);
  }
});
