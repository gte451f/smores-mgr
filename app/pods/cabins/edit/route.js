import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';


export default Ember.Route.extend({
  setupController: function (controller, model) {
    this._super(controller, model);
    controller.set("genders", ["Male", "Female", "Mixed"]);
  },

  actions: {
    /**
     *
     * @param model
     */
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.notify.success('Cabin Saved');
        self.transitionTo('cabins');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});