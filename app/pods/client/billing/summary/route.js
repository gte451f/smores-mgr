import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  model: function (params) {
    let currentAccount = this.get('currentAccount');
    return Ember.RSVP.hash({
      account: this.store.peekRecord('account', this.get('currentAccount.id')),
      payments: this.store.query('payment', {account_id: currentAccount.get('id')}),
      charges: this.store.query('charge', {account_id: currentAccount.get('id')})
    });

  },

  setupController: function (controller, resolved) {
    this._super(controller, resolved.account);

    controller.set('activePayments', resolved.payments);
    controller.set('activeCharges', resolved.charges);
  }
});
