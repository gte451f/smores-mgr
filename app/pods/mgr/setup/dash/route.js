import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    //params.event_id
    return Ember.RSVP.hash({
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin')
    });
  },

  setupController: function (controller, resolved) {
    this._super(controller, {});
    controller.set('model.locationCount', resolved.locations.content.length);
    controller.set('model.programCount', resolved.programs.content.length);
    controller.set('model.eventCount', resolved.events.content.length)
    controller.set('model.cabinCount', resolved.cabins.content.length);
    controller.set('model.sessionCount', resolved.sessions.content.length);
  }

});
