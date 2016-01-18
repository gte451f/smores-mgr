import Ember from 'ember';

export default Ember.Route.extend({
  model: function (params) {
    return Ember.RSVP.hash({
      model: this.store.queryRecord('registration', {id: params.registration_id, with: 'attendees,requests'}),
      charges: this.store.query('charge', {registration_id: params.registration_id})
    });
  },

  setupController: function (controller, resolved) {
    var model = resolved.model;
    this._super(controller, model);
  }
});