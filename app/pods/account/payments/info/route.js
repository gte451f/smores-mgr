import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import Account from 'smores-mgr/mixins/accounts/route';

export default Ember.Route.extend(ErrorHandler, Account, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  model: function (params) {
    return this.store.peekRecord('account', this.get('currentAccount.id'));
  },

  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {
      var self = this;
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

      model.destroyRecord().then(function () {
        self.get('notify').success('Successfully deleted!');
      }, function (reason) {
        console.log(reason);
        self.get('notify').error('Could not delete record!');
      });
    }
  }
});