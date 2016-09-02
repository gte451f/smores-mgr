import Ember from 'ember';

export default Ember.Route.extend({

  /**
   * load data for page
   *
   * @param params
   * @returns {*}
   */
  model: function (params) {
    //params.event_id
    return Ember.RSVP.hash({
      registration: this.store.query('registration', {with: 'all', id: params.registration_id}),
      requests: this.store.query('request', {with: 'all', registration_id: params.registration_id}),
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin')
    });
  },

  /**
   * format model for controller
   *
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    var model = resolved.registration.get('firstObject');


    // var requests = model.get('requests');
    // this doesn't seem to be used
    // var activeEvents = [];
    // requests.forEach(function (item) {
    //   activeEvents.pushObject(item);
    // });

    this._super(controller, model);
    // tweak location list since it is the only select not driven by a previously selected value
    var locationList = [];
    resolved.locations.forEach(function (item) {
      if (item.get('events').length > 0) {
        locationList.pushObject(item);
      }
    });

    // load the account record since we'll need it for one of the links
    controller.set('account', this.store.findRecord('attendee', model.get('attendee.id'), {include: 'accounts'}));

    controller.set('locations', locationList);
    controller.set('programs', resolved.programs);
    controller.set('events', resolved.events);
    controller.set('cabins', resolved.cabins);
    controller.set('sessions', resolved.sessions);
  }
});
