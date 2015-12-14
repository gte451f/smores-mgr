import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      paymentBatch: this.store.findRecord('payment-batch', params.payment_batch_id),
      payments: this.store.find('payment', {payment_batch_id: params.payment_batch_id, with: 'all'})
    });
  },

  setupController(controller, resolved)
  {
    var model = resolved.paymentBatch;
    this._super(controller, model);
  }
});
