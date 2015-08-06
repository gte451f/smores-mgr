import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    model: function (params) {
        return Ember.RSVP.hash({
            attendees: this.store.find('attendee', {id: params.attendee_id, with: 'registrations'})
        });
    },
    setupController: function (controller, resolved) {
        var model = resolved.attendees.get('firstObject');

        var siblings = [];
        this.store.find('attendee', {account_id: model.get('account.id')}).then(function (result) {
            result.forEach(function (item) {
                siblings.pushObject(item);
            });

        });

        this._super(controller, model);
        controller.set('siblings', siblings);
    }
});