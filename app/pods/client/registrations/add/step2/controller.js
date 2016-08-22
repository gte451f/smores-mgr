import Ember from 'ember';

export default Ember.Controller.extend({
  notify: Ember.inject.service(),
  registration: Ember.inject.service(),

  preferences: [1, 2, 3],

  actions: {
    /**
     * add a new request to the local list
     */
    addRequest: function () {
      //requests in single mode should not exceed three
      var requestLength = this.get('registration.requests').length;
      if (requestLength === 3) {
        this.get('notify').alert('Number of requests should not exceed: 3');
        return;
      }

      var requests = this.get('registration.requests');
      var requestContainer = this.get('registration.requestContainer');
      var request = requestContainer.create({priority: requestLength + 1});
      requests.pushObject(request);
      this.set('registration.requests', requests);
    },

    /**
     * remove a request record from the local list and store?
     */
    removeRequest: function (object) {
      var requestList = this.get('registration.requests');
      requestList.removeObject(object);

      // resort priority if in single mode
      var mode = this.get('registration.mode');
      if (mode === 0) {
        var priority = 1;
        requestList.forEach(function (item) {
          item.set('priority', priority);
          priority = priority + 1;
        });

      }
    }
  }
});
