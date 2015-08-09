import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        //params.event_id
        return Ember.RSVP.hash({
            registration: this.store.query('registration', {with: 'all', id: params.registration_id}),
            locations: this.store.findAll('location'),
            programs: this.store.findAll('program'),
            events: this.store.findAll('event'),
            sessions: this.store.findAll('session'),
            cabins: this.store.findAll('cabin')
        });
    },
    setupController: function (controller, resolved) {
        var model = resolved.registration.get('firstObject');
        this._super(controller, model);
        var modifiedEvents = [];
        resolved.events.forEach(function (item, index, enumerable) {
            item.set('fullName', item.get('program').get('name') + ' / ' + item.get('cabin').get('name'));
            modifiedEvents.addObject(item);
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
        controller.set('cabins', resolved.cabins);
        controller.set('sessions', resolved.sessions);
    }
});
