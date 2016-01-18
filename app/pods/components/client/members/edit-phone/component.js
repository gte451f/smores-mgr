import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Component.extend(Error, {
  notify: Ember.inject.service(),

  isEditing: false,

  actions: {
    edit: function () {
      this.set('isEditing', true);
    },

    cancel: function () {
      this.set('isEditing', false);
    },

    // send this action up to the controller
    delete: function (phone) {
      phone.destroyRecord();
    },

    save: function (model) {
      var self = this;
      model.save().then(function (data) {
        self.get('notify').success('Phone Number saved');
        self.set('isEditing', false);
      }, function (reason) {
        self.handleXHR(reason);
      });
    }
  }
});
