import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify : Ember.inject.service(),
  session: Ember.inject.service(),

  model: function (params) {
    return this.store.findRecord('owner', params.owner_id, { include: 'all' });
  },

  actions: {
    /**
     * remove owner from API as long as it isn't the current owner
     * @param owner
     */
    delete(owner) {
      var currentOwnerId = this.get('session.data.authenticated.data.id');

      if (currentOwnerId === owner.get('id')) {
        this.get('notify').alert('Cannot remove your own owner account!');
        return;
      }
      owner.destroyRecord().then((data) => {
        this.get('notify').success('Owner Deleted');
        this.transitionTo('client.members.list');
      }, function (reason) {
        this.validationReport(reason);
      });
    },


    /**
     * save owner to api
     * @param owner
     */
    save(owner) {
      this.controller.set('ownerSaving', true);
      owner.save().then((data) => {
        this.get('notify').success('Owner Saved');
        this.controller.set('ownerSaving', false);
      }, function (reason) {
        this.validationReport(reason);
        this.controller.set('ownerSaving', false);
      });
    },

    /**
     * cancel edit and revert changes
     * @param owner
     */
    cancel(owner) {
      owner.rollbackAttributes();
      this.transitionTo('client.members.list');
    }
  }
});
