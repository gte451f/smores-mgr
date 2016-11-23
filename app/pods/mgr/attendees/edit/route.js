import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  model: function (params) {
    return this.store.findRecord('attendee', params.attendee_id);
  },

  setupController: function (controller, model) {
    // convert value to something more truthy
    // toggle doesn't like semi truthy values
    if (model.get('active') === 1) {
      controller.set('activeStatus', true);
    } else {
      controller.set('activeStatus', false);
    }
    this._super(controller, model);
  }
});
