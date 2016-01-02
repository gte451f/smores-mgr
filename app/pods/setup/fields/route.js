import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(Error, {
  notify: Ember.inject.service(),

  model: function (params) {
    return this.store.findAll('field');
  },

  actions: {
    /**
     * remove a field from the system
     * put in route since the modal doesn't seem to send actions to it
     * @param model
     */
    removeField: function (model) {
      var self = this;
      model.destroyRecord().then(function () {

        self.get('notify').success('Field & related data removed from system!');
      }, function (reason) {
        self.handleXHR(reason);
      });
    },
  }
});
