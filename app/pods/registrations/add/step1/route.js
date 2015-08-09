import Ember from 'ember';

export default Ember.Route.extend({
    // check wizard start detector
    activate: function () {
        var add = this.controllerFor('registrations.add');
        //var wizardToken = add.get('wizardToken');
        add.set('wizardToken', 'step1');
        return true;
    },
    model: function (params) {
        //params.event_id
        return Ember.RSVP.hash({
            model: {},
            attendees: this.store.query('attendee', {limit: 1})
        });
    },
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);

        var users = [];

        controller.set('attendees', resolved.attendees);
        controller.set("users", users);
    }
});