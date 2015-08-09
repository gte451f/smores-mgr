import Ember from 'ember';

export default Ember.Route.extend({

    model: function (params) {
        //params.event_id
        return Ember.RSVP.hash({
            model: this.store.createRecord('event'),
            locations: this.store.query('location'),
            programs: this.store.query('program'),
            cabins: this.store.query('cabin'),
            sessions: this.store.query('session')
        });
    },
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);
        controller.set('locations', resolved.locations);
        controller.set('programs', resolved.programs);
        controller.set('sessions', resolved.sessions);
        controller.set('cabins', resolved.cabins);
    }
});
