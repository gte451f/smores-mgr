import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

  //reset the model in case you return to add another record
  model: function (params) {
    return {};
  },

  actions: {

    /**
     * save a new card record
     *
     * @param model
     * @returns {boolean}
     */
    save: function (model) {
      var self = this;

      // set some default values on the model
      model.active = 1;
      var accountId = this.get('session.secure.accountId');
      model.account = this.store.peekRecord('account', accountId);

      if (Ember.isEmpty(model.account)) {
        // error, no account detected
        this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
        return false;
      }

      var newRecord = this.store.createRecord('card', model);
      newRecord.save().then(function (post) {
        self.set('model', {});
        self.transitionTo('cards');
        self.get('notify').success('Card Added');
      }, function (reason) {
        // roll back progress
        newRecord.deleteRecord();
        self.validationReport(newRecord);
      });
    }
  }
});
