import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, Error, {
    notify: Ember.inject.service(),
    currentAccount: Ember.inject.service(),

    /**
     * create fake models so validation will work
     *
     * @param params
     * @returns {{phone: *, owner: *}}
     */
    model: function (params) {
      var owner = this.store.createRecord('owner', {userType: 'Owner', active: true});
      var phone = this.store.createRecord('owner-number', {primary: 1});
      return {phone: phone, owner: owner};
    },

    /**
     * inject current account after it has had a chance to load
     *
     * @param controller
     * @param model
     */
    setupController: function (controller, model) {
      let currentAccount = this.get('currentAccount.account');
      if (Ember.isEmpty(currentAccount)) {
        // error, no account detected
        this.get('notify').alert('An internal error occurred.  Please logout and log back into the system.');
      } else {
        model.owner.set('account', currentAccount);
      }
      this._super(controller, model);
    },

    actions: {
      /**
       * add a new owner to the current account
       * will create a new owner record followed by a phone record
       *
       * @param model
       */
      save(owner, phone) {
        var account = owner.get('account');
        owner.save().then((data) => {
          var self = this;
          //then save the phone
          phone.set('owner', owner);
          phone.save().then(function () {
            self.get('notify').success('Owner created');
            //reset to original position
            var owner = self.store.createRecord('owner', {userType: 'Owner', active: true, account: account});
            var phone = self.store.createRecord('owner-number', {primary: 1});
            self.set('model', {phone: phone, owner: owner});
            self.transitionTo('client.members.list');
          }, function (reason) {
            self.handleFormError(reason);
          });
        }, (reason) => {
          this.handleFormError(reason);
        });
      }
    }
  }
)
;

