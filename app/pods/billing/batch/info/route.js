import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return this.store.find('payment-batch', {id: params.payment_batch_id, with: 'all'});
  },

  setupController(controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }

});
