import Ember from 'ember';
import Error from 'bigstuf-client/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  model: function (params) {
    // fill out some default values
    return {phone: {primary: 1}, owner: {userType: 'Owner', active: true}};
  },
  actions: {
    /**
     * add a new owner to the current account
     * will create a new owner record followed by a phone record
     *
     * roll back in case of failure
     *
     * @param model
     */
    save: function (model) {
      var self = this;

      //first save the owner
      var account = this.get('currentAccount.account');
      model.owner.account = account;

      if (Ember.isEmpty(account)) {
        // error, no account detected
        this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
        return false;
      }
      var newOwner = this.store.createRecord('owner', model.owner);

      newOwner.save().then(function (data) {
        var that = self;
        //then save the phone
        model.phone.owner = newOwner;
        var newPhone = self.store.createRecord('owner-number', model.phone);
        newPhone.save().then(function () {
          that.get('notify').success('Owner created');
          //reset to original position
          that.set('model', {phone: {primary: 1}, owner: {userType: 'Owner', active: true}});
          that.transitionTo('client.members.list');
        }, function (reason) {
          // roll back progress
          newPhone.deleteRecord();
          newOwner.destoryRecord();
          self.validationReport(newPhone);
        });
      }, function (reason) {
        // roll back progress
        newOwner.deleteRecord();
        self.validationReport(newOwner);
      });
    }
  }
});

