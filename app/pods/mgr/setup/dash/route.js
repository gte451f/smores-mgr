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
    controller.set('model.locationCount', this.store.metadataFor("location").total_record_count);
    controller.set('model.programCount', this.store.metadataFor("program").total_record_count);
    controller.set('model.eventCount', this.store.metadataFor("event").total_record_count);
    controller.set('model.cabinCount', this.store.metadataFor("cabin").total_record_count);
    controller.set('model.sessionCount', this.store.metadataFor("session").total_record_count);
  }

});
