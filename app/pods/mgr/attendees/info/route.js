import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  // for some reason model reopen doesn't take if we use endpoint/#
  model: function (params) {
    return this.store.findRecord('attendee', params.attendee_id, {include: 'accounts,registrations', reload: true});
  },

  setupController: function (controller, model) {
    var siblings = [];
    this.store.query('attendee', {account_id: model.get('account.id')}).then(function (result) {
      result.forEach(function (item) {
        if (item.get('id') !== model.get('id')) {
          siblings.pushObject(item);
        }
      });
    });
    this._super(controller, model);
    controller.set('siblings', siblings);
  }
})
;
