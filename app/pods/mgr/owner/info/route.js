import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, ErrorHandler, {
  model: function (params) {
    return this.store.query('owner', {id: params.owner_id, with: 'all'});
  },

  setupController(controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  },

  actions: {
    /**
     * remove owner from API as long as it isn't the current owner
     * @param owner
     */
    delete(owner) {
      var accountId = owner.get('account.id');
      owner.destroyRecord().then((data) => {
        this.get('notify').success('Owner Deleted');
        this.transitionTo('mgr.account.info', accountId);
      }, function (reason) {
        this.validationReport(reason);
      });
    }
  }
});
