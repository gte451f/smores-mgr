import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return Ember.RSVP.hash({
            events: this.store.find('event', {id: params.event_id, with: 'locations,sessions,cabins,programs'}),
            requests: this.store.find('request', {event_id: params.event_id})
        });
    },
    setupController: function (controller, resolved) {
        var model = resolved.events.get('firstObject');
        this._super(controller, model);
        controller.set('requests', resolved.requests);
    }
});
