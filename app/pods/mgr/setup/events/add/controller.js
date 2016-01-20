import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  breadCrumb: 'Add',

  needs: ['mgr/setup/events/list'],
  actions: {
    save: function (model) {
      var self = this;
      model.save().then(function (post) {
        // only push to array if we've already loaded any records into the array
        self.get('controllers.mgr.setup.events.list').get('model').content.addRecord(post);
        self.get('notify').success('Success saving event!');
        self.transitionToRoute('mgr.setup.events.list');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
