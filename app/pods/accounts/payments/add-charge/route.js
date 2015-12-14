import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  // plug in account, load requests and fees
  model: function (params) {
    // pull account from parent
    var account = this.modelFor('accounts.payments');
    return Ember.RSVP.hash({
      model: {account: account},
      //depend on sideloading for related requests
      registrations: this.store.query('registration', {with: 'all', 'attendees:account_id': account.get('id')}),
      fees: this.store.findAll('fee')
    });
  },

  // format cards for display in select box
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);

    // flatten a list of requests for the whole account
    // only include requests that are marked as confirmed, no sense charging anything else
    let requests = [];
    resolved.registrations.forEach(function (registration) {
      registration.get('requests').forEach(function (request) {
        if (request.get('submitStatus') == 'Confirmed') {
          requests.push(request);
        }
      });
    });

    controller.set('requests', requests);
    controller.set('fees', resolved.fees);
  },

  actions: {
    /**
     * create a new charge based on custom data or a selected request and fee
     * @param model
     */
    save: function (model) {
      var self = this;
      // if a fee is selected, populate charge values based on the selected fee
      if (model.fee) {
        model.name = model.fee.get('name');
        model.amount = model.fee.get('amount');
      }

      if (model.request) {
        model.registration = model.request.get('registration');
      }

      var charge = this.store.createRecord('charge', model);
      charge.save().then(function (post) {
        var id = charge.get('account').get('id');
        self.get('notify').success('Success saving charge!');
        self.transitionTo('accounts.payments.info', id);
      }, function (reason) {
        self.validationReport(charge);
      });
    }
  }
});
