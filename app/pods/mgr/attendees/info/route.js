import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  // for some reason model reopen doesn't take if we use endpoint/#
  model: function (params) {
    return this.store.queryRecord('attendee', {id: params.attendee_id, with: 'registrations'});
  },

  setupController: function (controller, model) {
    var siblings = [];
    this.store.query('attendee', {account_id: model.get('account.id')}).then(function (result) {
      result.forEach(function (item) {
        siblings.pushObject(item);
      });
    });

    this._super(controller, model);
    controller.set('siblings', siblings);
  }
});