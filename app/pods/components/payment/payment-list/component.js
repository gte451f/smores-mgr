import Ember from 'ember';


export default Ember.Component.extend({

  // either use client or management payment link
  addLink: Ember.computed('admin', function () {
    if (this.get('admin')) {
      return 'mgr.account.payments.add-payment';
    } else {
      return 'client.billing.add-payment';
    }
  })

});
