import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
// import { moment, ago } from 'ember-moment/computed';

export default Ember.Route.extend(ErrorHandler, {
    // create a blank payment record & gather available credit cards
    model: function (params) {
        // pull account from parent
        var account = this.modelFor('accounts.payments');
        var payment = {};
        var check = {};
        check.account = account;
        payment.account = account;

        return Ember.RSVP.hash({
            model: payment,
            cards: this.store.find('card', {account_id: params.account_id}),
            check: check
        });

    },

// format cards for display in select box
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);

        var cards = resolved.cards;
        cards.forEach(function (item) {
            item.set('name', item.get('vendor') + ' - ' + item.get('expirationMonth') + '/' + item.get('expirationYear'));
        });
        controller.set('model.cards', cards);
        controller.set('model.blankCheck', resolved.check);
    },


    actions: {
        save: function (model) {
            var self = this;
            var controller = this.controllerFor(this.routeName);
            // create a new check first then create the payment

            if (controller.isCheck === true) {
                var inputs = controller.get('model.blankCheck');

                var check = this.store.createRecord('check', {number: inputs.number, account: inputs.account});
                check.set('date', new Date(inputs.date));

                check.save().then(function (post) {
                    model.check = post;
                    self.savePayment(model);
                }, function (reason) {
                    self.handleXHR(reason);
                });

            } else {
                this.savePayment(model);
            }
        }
    },

// break out to a small function for DRY
    savePayment: function (model) {
        var self = this;
        var payment = this.store.createRecord('payment', model);
        payment.save().then(function (post) {
            var id = model.account.get('id');
            self.notify.success('Success saving payment!');
            self.transitionTo('accounts.payments.info', id);
        }, function (reason) {
            self.handleXHR(reason);
        });
    }
});
