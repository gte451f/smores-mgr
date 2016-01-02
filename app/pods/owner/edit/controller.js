import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import CustomFields from 'smores-mgr/mixins/crud/custom-fields';

export default Ember.Controller.extend(ErrorHandler, CustomFields, {
  notify: Ember.inject.service(),
  breadCrumb: 'Edit',

  // configure custom fields base table
  baseTable: 'owners',

  activeStatus: null,

  actions: {
    save: function (event) {
      var model = this.get('model');
      var self = this;
      model.save().then(function () {
        var id = model.get('id');
        self.transitionToRoute('owners.info', id);
        self.get('notify').success('Owner was updated');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
