import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {
  model: function (params) {
    return this.store.query('owner', {id: params.owner_id, with: 'all'});
  },

  setupController(controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  }
});
