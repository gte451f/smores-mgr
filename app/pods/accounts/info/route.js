import Ember from 'ember';

//var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});

export default Ember.Route.extend({
    model: function (params) {
        // crafted as findQuery to ensure that a new record request if executed
        return this.store.findQuery('account', {id: params.account_id, with: 'all'});
    },

    setupController: function (controller, model) {
        controller.set("model", model.get('firstObject'));
    }
});