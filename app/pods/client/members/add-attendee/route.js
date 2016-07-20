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
   * @returns {*}
   */
  model: function (params) {
    return this.store.createRecord('attendee', {userType: 'Attendee', active: true})
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
      model.set('account', currentAccount);
    }
    this._super(controller, model);
  },

  actions: {
    /**
     * create a new attendee record
     *
     * @param model
     */
    save: function (attendee) {
      var account = attendee.get('account');
      attendee.save().then((data) => {
        this.get('notify').success('Camper Added');
        //reset to original position
        let resetAttendee = this.store.createRecord('attendee', {userType: 'Attendee', active: true, account: account});
        this.set('model', resetAttendee);
        this.transitionTo('client.members.list');
      }, function (reason) {
        this.handleFormError(reason);
      });

    }
  }
});
