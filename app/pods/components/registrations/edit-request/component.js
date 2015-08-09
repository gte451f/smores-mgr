import Ember from 'ember';


/**
 * A handy request selection component
 * Logic to chain select boxes together
 *
 */
export default Ember.Component.extend({

    // store the selected values
    currentLocation: false,
    currentSession: false,
    currentEvent: false,
    currentPriority: false,

    // set some default values based on the supplied object
    setup: function () {
        var event = this.get('request.event.id');
        if (event) {
            this.set('currentLocation', this.get('request.event.location'));
            this.set('currentSession', this.get('request.event.session'));
        } else {
            this.set('currentLocation', this.get('request.location'));
            this.set('currentSession', this.get('request.session'));
        }
        //this.set('currentPriority', this.get('request.priority'));
        //this.set('currentEvent', this.get('request.event'));
    }.on("init"),

    request: null,

    // the actual list of objects fed into the select box
    filteredSessions: [],
    filteredEvents: [],

    //select list
    priorities: ['1', '2', '3', '4', '5', '6', '7', '8', '9'],

    // disable or enable and build list
    eventState: function () {
        var current = this.get('currentSession');
        console.log('Event State');
        if (current === false || current === null || current === undefined) {
            return true;
        } else {
            this.buildEvents();
            return false;
        }
    }.property('currentSession'),

    // disable or enable and build list
    sessionState: function () {
        var current = this.get('currentLocation');
        console.log('Session State');
        if (current === false || current === null || current === undefined) {
            return true;
        } else {
            this.buildSessions();
            return false;
        }
    }.property('currentLocation'),

    // build a list of sessions based on previous choices
    buildSessions() {
        //var currentSession = this.get('currentSession');
        var currentLocation = this.get('currentLocation');
        var eventList = this.get('events').filterBy('location', currentLocation);
        var sessionList = this.get('sessions');
        var finalList = [];
        sessionList.forEach(function (item) {
            var value = eventList.findBy('session', item);
            if (Ember.isEmpty(value)) {
                // do nothing
            } else {
                finalList.pushObject(item);
            }

        });

        // finally set the session list with the correct options
        this.set('filteredSessions', finalList);
    },

    // build a list of events based on previous choices
    buildEvents() {
        var currentLocation = this.get('currentLocation');
        var currentSession = this.get('currentSession');

        var eventList1 = this.get('events');
        var eventList2 = eventList1.filterBy('location', currentLocation);
        var eventList3 = eventList2.filterBy('session', currentSession);

        var finalList = [];
        eventList3.forEach(function (item) {
            finalList.pushObject(item);
        });

        // finally set the session list with the correct options
        this.set('filteredEvents', eventList3);
    },
    actions: {

        /**
         * pass it out to controller to handle this record
         */
        removeRequest() {
            this.sendAction('action', this.get('request'));
        }
    }
});