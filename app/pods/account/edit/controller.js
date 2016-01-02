import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import CustomFields from 'smores-mgr/mixins/crud/custom-fields';

export default Ember.Controller.extend(ErrorHandler, CustomFields, {
  notify: Ember.inject.service(),
  breadCrumb: 'Edit',
  // configure custom fields base table
  baseTable: 'accounts',

  actions: {
    save: function (model) {
      var self = this;
      model.save().then(function () {
        var id = model.get('id');
        self.transitionToRoute('account.info', id);
        self.get('notify').success('Account was updated');
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});
