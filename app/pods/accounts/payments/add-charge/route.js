import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  // plug in account, load requests and fees
  model: function (params) {
    // pull account from parent
    var account = this.modelFor('accounts.payments');
    return Ember.RSVP.hash({
      model: {account: account},
      //depend on sideloading for related requests
      registrations: this.store.query('registration', {with: 'all', 'attendees:account_id': 15}),
      fees: this.store.findAll('fee')
    });
  },

  // format cards for display in select box
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);

    // flatten a list of requests for the whole account
    let requests = [];
    resolved.registrations.forEach(function (registration) {

      registration.get('requests').forEach(function (request) {
        requests.push(request);
      });
    });

    controller.set('requests', requests);
    controller.set('fees', resolved.fees);
  },

  actions: {
    save: function (model) {
      var self = this;
      var charge = this.store.createRecord('charge', model);
      charge.save().then(function (post) {
        var id = charge.get('account').get('id');
        self.notify.success('Success saving charge!');
        self.transitionTo('accounts.payments.info', id);
      }, function (reason) {
        self.validationReport(charge);
      });
    }
  }
});
