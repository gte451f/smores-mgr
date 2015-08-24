import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
  needs: ['programs'],

  actions: {
    save: function (model) {
      var self = this;
      if(Ember.typeOf(model) === 'object'){
        var model = this.store.createRecord('program', model);
        this.set('model', model);
      }

      model.save().then(function (post) {
        self.get('controllers.programs').get('model').content.addRecord(post);
        self.notify.success('Success saving record');
        self.transitionToRoute('programs.info', post);
      }, function (reason) {
        self.validationReport(model);
      });
    }
  }
});