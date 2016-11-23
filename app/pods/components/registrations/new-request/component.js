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
  currentPriority: false,

  // should the session list box be enabled?
  isSessionDisabled: Ember.computed('currentLocation', function () {
    return Ember.isEmpty(this.get('currentLocation')) ? true : false;
  }),
  // should the event list box be enabled?
  isEventDisabled: Ember.computed('currentSession', function () {
    return Ember.isEmpty(this.get('currentSession')) ? true : false;
  }),


  // set some default values based on the supplied object
  setup: Ember.on("init", function () {
    console.log('component setup called');
    var event = this.get('request.event.id');
    if (event) {
      this.set('currentLocation', this.get('request.event.location'));
      this.set('currentSession', this.get('request.event.session'));
    } else {
      this.set('currentLocation', this.get('request.location'));
      this.set('currentSession', this.get('request.session'));
    }
  }),

  request: null,

  //select list
  priorities: [1, 2, 3],


  /**
   * build a list of sessions based on previous choices
   */
  buildSessions() {
    var filteredEvents = this.get('events').filterBy('location.id', this.get('currentLocation').get('id'));
    var finalList = [];
    this.get('sessions').forEach(function (item) {
      if (!Ember.isEmpty(filteredEvents.findBy('session', item))) {
        finalList.pushObject(item);
      }
    });
    this.set('filteredSessions', finalList);
  },

  /**
   * build a list of events based on previous choices
   */
  buildEvents() {
    var allEvents = this.get('events');
    var eventsFilteredByLocation = allEvents.filterBy('location.id', this.get('currentLocation').get('id'));
    var eventsFilterdBySession = eventsFilteredByLocation.filterBy('session.id', this.get('currentSession').get('id'));
    this.set('filteredEvents', eventsFilterdBySession);
  },

  /**
   * build a list of sessions based on previous choices
   */
  // filteredSessions: Ember.computed('currentLocation', 'events', 'session', function () {
  filteredSessions: Ember.computed('currentLocation', function () {
    let currentLocation = this.get('currentLocation');
    let allEvents = this.get('events');
    if (Ember.isEmpty(currentLocation) || Ember.isEmpty(allEvents)) {
      return [];
    }

    var filteredEvents = this.get('events').filterBy('location.id', currentLocation.get('id'));
    var finalList = [];
    this.get('sessions').forEach(function (item) {
      if (!Ember.isEmpty(filteredEvents.findBy('session', item))) {
        finalList.pushObject(item);
      }
    });
    return finalList;
  }),

  /**
   * build a list of events based on previous choices
   */
  filteredEvents: Ember.computed('currentSession', 'currentLocation', 'events', function () {
    let currentLocation = this.get('currentLocation');
    let currentSession = this.get('currentSession');
    let allEvents = this.get('events');
    if (Ember.isEmpty(currentLocation) || Ember.isEmpty(currentSession) || Ember.isEmpty(allEvents)) {
      return [];
    }
    var eventsFilteredByLocation = allEvents.filterBy('location.id', currentLocation.get('id'));
    return eventsFilteredByLocation.filterBy('session.id', currentSession.get('id'));
  }),

  actions: {

    /**
     * update this value so computed properties will also trigger
     *
     * @param value
     * @returns {boolean}
     */
    locationChanged: function (value) {
      this.set('currentLocation', value);
      //reset down stream selects since the up stream select has changed
      this.set('currentSession', null);
      this.set('request.event', null);
    },

    /**
     * update this value so computed properties will also trigger
     * @param value
     */
    sessionChanged: function (value) {
      this.set('currentSession', value);
      //reset down stream selects since the up stream select has changed
      this.set('request.event', null);
    },

  }
});
