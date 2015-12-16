var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});
import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend( ErrorHandler, {
  notify: Ember.inject.service(),
  model: function (params) {
    // pull account from parent
    var account = this.modelFor('accounts.payments');

    return Ember.RSVP.hash({
      model: this.store.query('account', {id: account.get('id'), with: 'cards,checks,charges,payments'}),
      //charges: this.store.query('charge', {account_id: account.get('id')}),
      //payments: this.store.query('payment', {account_id: account.get('id')})
    });
  },

  setupController: function (controller, resolved) {
    var model = resolved.model.get('firstObject');
    this._super(controller, model);
    //controller.set("model", model);

    //notify parent of current account
    var accounts = this.controllerFor("accounts");
    var item = User.create({accountId: model.id});
    accounts.set('model', item);
  },

  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {

      //check for credit card payments, in which case make this a soft delete instead
      let mode = model.get('mode');
      // let id = model.get('id');
      if (!Ember.isEmpty(mode) && mode === 'Credit') {
        // submit a refund request instead
        model.set('mode', 'Refund');
        model.save().then(function (post) {
          self.get('notify').success('Charge refunded!');
        }, function (reason) {
          self.validationReport(model);
        });

        return;
      }

      var self = this;
      model.destroyRecord().then(function () {
        self.get('notify').success('Successfully deleted!');
      }, function (reason) {
        console.log(reason);
        self.get('notify').error('Could not delete record!');
      });
    }
  }
});