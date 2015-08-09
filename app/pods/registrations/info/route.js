import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            model: this.store.query('registration', {id: params.registration_id, with: 'attendees,requests'}),
            charges: this.store.query('charge', {registration_id: params.registration_id})
        });
    },

    setupController: function (controller, resolved) {
        var model = resolved.model.get('firstObject');
        this._super(controller, model);
    }
});