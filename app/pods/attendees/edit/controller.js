import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  breadCrumb: 'Edit',

  activeStatus: null,

  actions: {
    save: function (event) {
      var model = this.get('model');
      var self = this;
      model.save().then(function () {
        var id = model.get('id');
        self.transitionToRoute('attendees.info', id);
        self.get('notify').success('Attendee was saved!');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
