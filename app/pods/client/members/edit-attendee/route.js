import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  model: function (params) {
    return this.store.findRecord('attendee', params.attendee_id, {include: 'all'});
  },

  actions: {
    /**
     * remove attendee from API as long as it isn't the current attendee
     * @param attendee
     */
    delete(attendee) {
      attendee.destroyRecord().then((data) => {
        this.get('notify').success('Attendee Deleted');
        this.transitionTo('client.members.list');
      }, function (reason) {
        this.validationReport(reason);
      });
    },


    /**
     * save attendee to api
     * @param attendee
     */
    save(attendee) {
      this.controller.set('attendeeSaving', true);
      attendee.save().then((data) => {
        this.get('notify').success('Attendee Saved');
        this.controller.set('attendeeSaving', false);
        this.transitionTo('client.members.list');
      }, function (reason) {
        this.controller.set('attendeeSaving', false);
        this.validationReport(reason);
      });
    },

    /**
     * cancel edit and revert changes
     * @param attendee
     */
    cancel(attendee) {
      attendee.rollbackAttributes();
      this.transitionTo('client.members.list');
    }
  }
});
