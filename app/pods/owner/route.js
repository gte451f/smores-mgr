import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return this.store.find('owner', {id: params.owner_id, with: 'all'});
    },

    setupController(controller, resolved) {
        var model = resolved.get('firstObject');
        this._super(controller, model);
    }
});
