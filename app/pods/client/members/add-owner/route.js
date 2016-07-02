import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),

  model: function (params) {
    // let owner = this.store.createRecord('owner', {userType: 'Owner', active: true});
    // let phone = this.store.createdRecord('phone', );

    var owner = this.store.createRecord('owner', {userType: 'Owner', active: true});
    var phone = this.store.createRecord('owner-number', {primary: 1});


    // fill out some default values
    return {phone: phone, owner: owner};
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
    save: function (owner, phone) {
      let currentAccount = this.get('currentAccount.account');
      //first save the owner
      owner.set('account', currentAccount);

      if (Ember.isEmpty(currentAccount)) {
        // error, no account detected
        this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
        return false;
      }

      owner.save().then((data) => {
        var self = this;
        //then save the phone
        phone.set('owner', owner);
        phone.save().then(function () {
          self.get('notify').success('Owner created');
          //reset to original position
          self.set('model', {phone: {primary: 1}, owner: {userType: 'Owner', active: true}});
          self.transitionTo('client.members.list');
        }, function (reason) {
          // roll back progress
          phone.deleteRecord();
          owner.destroyRecord();


          // process validation or bubble up
          if (reason && reason.errors[0].status === "422") {
            // Validation Error, inform user and swallow error
            this.get('notify').alert('Email address already registered.');
            // this.validationReport(newOwner);
          } else {
            // Bubble up to global error handler
            throw reason;
          }


        });
      }, (reason) => {
        // roll back progress
        owner.deleteRecord();

        // process validation or Bubble up to global error handler
        if (reason && reason.errors[0].status === "422") {
          // Validation Error, inform user and swallow error
          this.get('notify').alert('Email address already registered.');
          // this.validationReport(newOwner);
        } else {
          // Bubble up to global error handler
          throw reason;
        }
      });
    }
  }
});

