import Ember from 'ember';

export default Ember.Route.extend({
  registration: Ember.inject.service(),

  /**
   * look for page refresh activity and send them back to the start
   *
   * @returns {boolean}
   */
  activate: function () {
    if (this.get('registration.wizardToken') === 'start') {
      this.transitionTo('client.registrations.add.step1');
    } else {
      this.get('registration').set('wizardToken', 'step2');
    }
    return true;
  },

  /**
   * load the default set of registration related tables
   * @param params
   * @returns {*}
   */
  model: function (params) {
    //params.event_id
    return Ember.RSVP.hash({
      model: {},
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin')
    });
  },

  /**
   * setup step2 with a modified list of events, locations and other request goodies
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);

    // load gender so we can filter cabins

    var camper = this.get('registration.camper');
    var gender = camper.get('gender');

    var modifiedEvents = [];
    resolved.events.forEach(function (item, index, enumerable) {
      if (item.get('cabin').get('gender') === gender || item.get('cabin').get('gender') === 'Mixed') {
        item.set('fullName', item.get('program').get('name') + ' / ' + item.get('cabin').get('name'));
        modifiedEvents.addObject(item);
      }
    });

    // tweak location list since it is the only select not driven by a previously selected value
    var locationList = [];
    resolved.locations.forEach(function (item) {
      if (item.get('events').length > 0) {
        locationList.pushObject(item);
      }
    });

    controller.set('locations', locationList);
    controller.set('programs', resolved.programs);
    controller.set('events', modifiedEvents);
    controller.set('sessions', resolved.sessions);
  }
});
