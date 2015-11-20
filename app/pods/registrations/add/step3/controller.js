import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(Error, {
  notify: Ember.inject.service(),
  registration: Ember.inject.service(),

  actions: {

    /**
     * gather all data from the wizard and issue a save
     */
    save: function () {
      var self = this;

      //first save a registration
      var data = {
        attendee: this.get('registration.camper'),
        notes: this.get('registration.registrationNote')
      };
      var newRegistration = this.store.createRecord('registration', data);

      // group of requests to also save
      var subItems = [];

      // a function to save a request
      var requestSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      // it's go time, perform the save
      newRegistration.save().then(function (post) {
        var that = self;

        //now add requests for the registration
        var requests = self.get('registration.requests');
        var requestCount = requests.length;
        var registrationId = post.get('id');

        requests.forEach(function (item, index, enumerable) {
          var data = {
            event: item.get('event'),
            registration: post,
            priority: item.get('priority'),
            note: item.get('note')
          };
          var request = self.store.createRecord('request', data);
          subItems.push(requestSave(request));
        }, this);

        Ember.RSVP.all(subItems).then(function () {
          // reset registration wizard
          that.get('registration').resetRegistration();
          self.get('notify').success('Success saving registration including ' + requestCount + ' individual requests.');
          self.transitionToRoute('registrations.info', registrationId);
        }, function (reason) {
          self.handleXHR(reason);
        });
      }, function (reason) {
        self.validationReport(newRegistration);
      });
    } // end save function

  }
});
