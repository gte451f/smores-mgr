import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service(),
  redirectsTo: 'mgr.dash',
  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {
      var self = this;
      model.destroyRecord().then(function () {
        self.get('notify').success('Successfully removed event!');
        self.transitionTo('mgr.setup.events.list');
      }, function (reason) {
        console.log(reason);
        self.get('notify').error('Could not delete record!');
      });
    }
  }
});