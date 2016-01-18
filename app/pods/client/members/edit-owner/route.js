import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify: Ember.inject.service(),

  model: function (params) {
    return this.store.query('owner', {with: 'all', id: params.owner_id});
  },
  setupController(controller, resolved) {
    var model = resolved.get('firstObject');
    this._super(controller, model);
  },
  actions: {
    save: function (model) {
      var self = this;
      model.save().then(function () {
        self.get('notify').success('Owner Saved');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
