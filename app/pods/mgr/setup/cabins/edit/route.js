import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';


export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),

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
        self.get('notify').success('Cabin Saved');
        self.transitionTo('mgr.setup.cabins');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});