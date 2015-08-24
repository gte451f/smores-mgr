import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  actions: {
    //handle save operation
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        self.notify.success('Record Saved!!');
        self.transitionToRoute('programs.info', post);
      }, function (reason) {
        self.simpleReport(model);
        // self.validationReport(model);
      });
    }
  }
});
