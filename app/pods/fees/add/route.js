import Ember from 'ember';

export default Ember.Route.extend({

    //reset the model in case you return to add another record
    model: function () {
        return this.store.createRecord('fee');
    },

    setupController: function (controller, model) {
        this._super(controller, model);
    }
});
