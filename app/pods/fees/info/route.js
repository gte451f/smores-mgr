import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service(),

  actions: {
    //wipe the supplied record and go back to the mother ship
    delete: function (model) {
      var self = this;
      var controller = this.controllerFor('fees');
      model.destroyRecord().then(function () {
        controller.get('model').content.removeObject(model);
        self.get('notify').success('Successfully removed fee');
        self.transitionTo('fees');
      }, function (reason) {
        console.log(reason);
        self.get('notify').error('Could not delete record!');
      });
    }
  }
});
