import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, Error, {
  notify: Ember.inject.service(),
  currentAccount: Ember.inject.service(),


  /**
   * load all relevant attendees
   * @param params
   * @returns {*}
   */
  model: function (params) {
    var accountId = this.get('currentAccount.id');
    return Ember.RSVP.hash({
      registration: this.store.createRecord('registration', {}),
      attendees: this.store.query('attendee', {account_id: accountId}),
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin'),
      fees: this.store.query('fee', {basis: 'Registration'})
    });
  },

  /**
   * pass attendees to controller
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved);

    // seed wizard with a single request
    var newRequest = this.store.createRecord('request', {priority: 1, registration: resolved.registration});
    controller.get('newRequests').pushObject(newRequest);
  },

  actions: {
    /**
     * add a new request to the local list
     */
    addRequest: function () {
      var registration = this.controller.get('model.registration');
      var requests = this.controller.get('newRequests');

      if (this.controller.get('registrationMode') === 'Single') {
        //requests in single mode should not exceed three
        if (requests.length === 3) {
          this.get('notify').alert('Number of requests should not exceed: 3');
          return;
        }
      }

      // create new request and push to wizard
      let priority = (requests.length >= 3) ? 1 : requests.length + 1;
      var newRequest = this.store.createRecord('request', {priority: priority, registration: registration});
      requests.pushObject(newRequest);
      this.set('newRequests', requests);
    },

    /**
     * remove a request record from the local list and store?
     */
    removeRequest: function (request) {

      var requestList = this.controller.get('newRequests');
      // do not allow removing the last request
      if (requestList.length === 1) {
        this.get('notify').alert('You must submit at least one event request');
        return;
      }
      requestList.removeObject(request);
      request.destroyRecord();


      // resort priority if in single mode
      if (this.controller.get('registrationMode') === 'Single') {
        var priority = 1;
        requestList.forEach(function (item) {
          item.set('priority', priority);
          priority = priority + 1;
        });
      }
    },

    /**
     * gather all data from the wizard and issue a save
     */
    save: function () {
      var self = this;

      //first save a registration
      // var data = {
      //   attendee: this.get('registration.camper'),
      //   notes: this.get('registration.registrationNote')
      // };
      // var newRegistration = this.store.createRecord('registration', data);
      var newRegistration = this.controller.get('model.registration');

      var subItems = [];

      // a function to save a sub-item
      var subItemSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      /**
       * success handler for save action
       * @param post
       */
      function success(post) {
        var that = self;

        //now add requests for the registration
        // var requests = self.controller.get('registration.requests');
        var requestCount = newRegistration.get('requests').length;
        var registrationId = post.get('id');

        newRegistration.get('requests').forEach(function (item) {
          // var data = {
          //   event: item.get('event'),
          //   registration: post,
          //   priority: item.get('priority'),
          //   note: item.get('note')
          // };
          // var request = self.store.createRecord('request', data);
          subItems.push(subItemSave(item));
        }, this);

        Ember.RSVP.all(subItems).then(function () {
          // reset registration wizard
          that.get('registration').resetRegistration();
          self.get('notify').success('Success saving registration including ' + requestCount + ' individual requests.');
          self.transitionToRoute('registrations.info', registrationId);
        }, failure);
      }

      /**
       * handle an error in saving the new registration record
       * @param reason
       */
      function failure(reason) {
        var errorHTML = '<strong>' + reason.responseJSON.records.userMessage + '</strong> <br/>';
        reason.responseJSON.records.validationList.forEach(function (item) {
          errorHTML = errorHTML + item.message + '<br/>';
        }, this);
        self.get('notify').warning({raw: errorHTML});
      }

      // it's go time, perform the save
      newRegistration.save().then(success, failure);
    } // end save function


  }

});
