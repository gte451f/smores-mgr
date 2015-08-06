var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});
import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        // pull account from parent
        var account = this.modelFor('accounts.payments');

        return Ember.RSVP.hash({
            model: this.store.find('account', {id: account.get('id'), with: 'cards,checks,charges,payments'}),
            //charges: this.store.find('charge', {account_id: account.get('id')}),
            //payments: this.store.find('payment', {account_id: account.get('id')})
        });
    },

    setupController: function (controller, resolved) {
        var model = resolved.model.get('firstObject');
        this._super(controller, model);
        //controller.set("model", model);

        //notify parent of current account
        var accounts = this.controllerFor("accounts");
        var item = User.create({accountId: model.id});
        accounts.set('model', item);
    },

    actions: {
        //wipe the supplied record and go back to the mother ship
        delete: function (model) {
            var self = this;
            model.destroyRecord().then(function () {
                self.notify.success('Successfully deleted!');
                //self.transitionTo('events.list');
            }, function (reason) {
                console.log(reason);
                self.notify.error('Could not delete record!');
            });
        }
    }
});