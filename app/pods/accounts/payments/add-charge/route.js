import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
    // create a bank payment record & gather available credit cards
    model: function (params) {
        // pull account from parent
        var account = this.modelFor('accounts.payments');
        var charge = {account: account};
        return Ember.RSVP.hash({
            model: charge,
            //depend on sideloading for related requests
            registrations: this.store.find('registration', {account_id: params.account_id}),
            fees: this.store.find('fee')
        });

    },

    // format cards for display in select box
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);

        controller.set('model.registrations', resolved.registrations);
        controller.set('model.fees', resolved.fees);
    },


    actions: {
        save: function (model) {
            var self = this;
            var charge = this.store.createRecord('charge', model);
            charge.save().then(function (post) {
                var id = charge.get('account').get('id');
                self.notify.success('Success saving charge!');
                self.transitionTo('accounts.payments.info', id);
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
