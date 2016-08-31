import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Mixin.create(Error, {
  notify: Ember.inject.service(),

  // this should be defined in the implementing route
  afterSaveRoute: 'DEFINE ME',


  /**
   * load all relevant attendees
   * @param params
   * @returns {*}
   */
  model: function (params) {
    return Ember.RSVP.hash({
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin'),
      fees: this.store.query('fee', {basis: 'Registration'})
    });
  },

  /**
   * reset key variables each time the page is loaded
   *
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    // setup main registration
    resolved.registration = this.store.createRecord('registration', {});
    this._super(controller, resolved);

    // seed wizard with a single request
    let newRequests = [];
    newRequests.pushObject(this.store.createRecord('request', {priority: 1, registration: resolved.registration}));
    controller.set('newRequests', newRequests);
    // put the wizard back on step one
    controller.set('currentStep', 1);

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
      var newRegistration = this.controller.get('model.registration');

      // all the requests that need saving
      var subItems = [];

      // it's go time, perform the save
      newRegistration.save().then((post)=> {
        //now add requests for the registration
        var requestCount = newRegistration.get('requests').length;
        var registrationId = post.get('id');

        newRegistration.get('requests').forEach(function (item) {
          subItems.push(item.save());
        }, this);

        Ember.RSVP.all(subItems).then(function () {
          // get out of here!
          self.get('notify').success('Success saving registration including ' + requestCount + ' individual requests.');
          self.transitionTo(self.get('afterSaveRoute'), registrationId);
        }, (reason) => {
          self.handleFormError(reason);
        });
      }, (reason) => {
        this.handleFormError(reason);
      });
    } // end save function
  }
});
