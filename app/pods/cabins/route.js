import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  model: function (params) {
    return this.store.findAll('cabin');
  },

  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {
      var self = this;
      model.destroyRecord().then(function () {
        self.notify.success('Cabin Removed');
        self.transitionTo('cabins');
      }, function (reason) {
        self.validationReport(newRecord);
      });
    }
  }
});