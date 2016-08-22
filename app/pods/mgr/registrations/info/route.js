import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      model: this.store.findRecord('registration', params.registration_id, {include: 'attendees,requests'}),
      charges: this.store.query('charge', {registration_id: params.registration_id})
    });
  },

  setupController: function (controller, resolved) {
    var model = resolved.model;
    this._super(controller, model);
  }
});
