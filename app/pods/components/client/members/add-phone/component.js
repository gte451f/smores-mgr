import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Component.extend(Error, {
  notify: Ember.inject.service(),

  //isAdding: false,
  phone: {
    phoneType: null,
    primary: null,
    number: null,
    owner: null
  },

  actions: {
    save: function (formData) {
      var self = this;
      formData.owner = this.get('owner');

      //load data store
      var store = this.get('targetObject.store');

      var number = store.createRecord('owner-number', formData);

      number.save().then(function (child) {
        self.get('notify').success('New phone number added.');
        //reset base component
        self.set('phone', {
          phoneType: null,
          primary: null,
          number: null
        });
        self.set('isAdding', false);
      }, function (reason) {
        self.handleXHR(reason);
      });
    },

    cancel: function () {
      this.set('isAdding', false);
    }
  }
});
