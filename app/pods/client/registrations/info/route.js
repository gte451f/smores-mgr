import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      model: this.store.query('registration', {id: params.registration_id, with: 'attendees'}),
      requests: this.store.query('request', {registration_id: params.registration_id, with: 'all'}),
      charges: this.store.query('charge', {registration_id: params.registration_id})
    });
  },

  setupController: function (controller, resolved) {
    var self = this;
    // get the full event here since we need to side load in event details
    resolved.requests.forEach(function (item) {
      self.store.findRecord('event', item.get('event.id'), {include: 'all'});
    });

    var model = resolved.model.get('firstObject');
    this._super(controller, model);
  }
});
