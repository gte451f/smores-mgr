var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});
import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    model: function (params) {
        return Ember.RSVP.hash({
            model: this.store.find('account', params.account_id),
            registrations: this.store.find('registration', {'attendees:account_id': params.account_id, with: 'all'})
        });

    },

    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);
        controller.set('model.registrations', resolved.registrations);

        // notify parent of the current account
        var accounts = this.controllerFor("accounts");
        var item = User.create({accountId: resolved.model.id});
        accounts.set('model', item);
    }
});