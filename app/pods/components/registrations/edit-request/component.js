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

  // listbox state
  // should the following listboxes be enabled/disabled
  isSessionDisabled: true,
  isEventDisabled: true,

  /**
   * set some default values based on the supplied object
   */
  setup: Ember.on("init", function () {
    let event = this.get('request.event');
    if (event) {
      this.set('currentLocation', event.get('location'));
      this.set('currentSession', event.get('session'));
      this.buildSessions();
      this.buildEvents();
      this.set('isSessionDisabled', false);
      this.set('isEventDisabled', false);
    }
  }),

  request: null,

  // the actual list of objects fed into the select box
  filteredSessions: [],
  filteredEvents: [],

  //available priorities
  priorities: [1, 2, 3, 4, 5, 6, 7, 8, 9],

  /**
   * reset select to a default state by enabling and setting to null value
   * refresh list of sessions based on previous choices
   *
   */
  buildSessions() {
    var currentLocation = this.get('currentLocation.id');
    var allEvents = this.get('events');
    var eventList = allEvents.filterBy('location.id', currentLocation);
    var sessionList = this.get('sessions');
    var finalList = [];
    sessionList.forEach(function (item) {
      var value = eventList.findBy('session', item);
      if (!Ember.isEmpty(value)) {
        finalList.pushObject(item);
      }

    });

    // finally set the session list with the correct options
    this.set('filteredSessions', finalList);
  },

  /**
   * reset select to a default state by enabling and setting to null value
   * build a list of events based on previous choices
   *
   */
  buildEvents() {
    var currentLocation = this.get('currentLocation.id');
    var currentSession = this.get('currentSession.id');

    var allEvents = this.get('events');
    var eventList2 = allEvents.filterBy('location.id', currentLocation);
    var eventList3 = eventList2.filterBy('session.id', currentSession);

    // finally set the session list with the correct options
    this.set('filteredEvents', eventList3);
  },
  actions: {

    /**
     * assume it is only called post render
     * disable or enable and build list
     *
     */
    locationChanged: function (value, component) {
      console.log('Location Changed');
      var self = this;
      //use provided context if provided
      if (!Ember.isEmpty(component)) {
        self = component.get('comp');
      }
      console.log(value);
      if (Ember.isEmpty(value)) {

      } else {
        self.set('currentLocation', value);
        self.buildSessions();
      }
      // reset downstream components
      self.send('sessionChanged', null, component);
    },

    /**
     * since this is driven by an x-select, use that context if one is provided
     * disable or enable and build list
     *
     * @param value
     * @param component
     */
    sessionChanged: function (value, component) {
      var self = this;
      //use provided context instead
      if (!Ember.isEmpty(component)) {
        self = component.get('comp');
      }
      console.log('Session Changed');
      if (Ember.isEmpty(value)) {
        self.set('isEventDisabled', true);
        //self.set('currentEvent', null);
        self.set('request.event', null);
      } else {
        self.set('isEventDisabled', false);
        self.set('currentSession', value);
        self.buildEvents();
      }
    },

    /**
     * pass it out to controller to handle this record
     */
    removeRequest() {
      this.sendAction('action', this.get('request'));
    }
  }
})
;
