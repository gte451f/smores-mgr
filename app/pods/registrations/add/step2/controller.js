import Ember from 'ember';

export default Ember.Controller.extend({
    //load up step1 for reference in template
    step1: Ember.inject.controller('registrations/add/step1'),

    location: null,
    event: null,

    // a basic request object...cookie meet cutter
    request: {
        location: null,
        event: null,
        program: null,
        note: null,
        priority: null
    },
    // list of requests to submit
    // this is only for add, not edit mode
    requests: [],
    actions: {
        addRequest: function () {
            var requests = this.get('requests');
            var count = requests.length + 1;
            var requestContainer = this.get('request');
            requestContainer.priority = count;
            var request = Ember.Object.create(requestContainer);
            requests.pushObject(request);
        },

        /**
         * remove a request record from the store
         */
        removeRequest: function (object) {
            var requestList = this.get('requests');
            requestList.removeObject(object);
        }
    }
});
