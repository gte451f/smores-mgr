import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Component.extend(Error, {
  notify: Ember.inject.service(),

  actions: {
    /**
     * save a new phone to the api and relate it to the supplied owner
     * @param formData
     */
    save: function (newPhone) {
      newPhone.set('owner', this.get('owner'));

      newPhone.save().then((data) => {
        this.get('notify').success('New phone number added');
        this.set('isAdding', false);
      }, function (reason) {
        this.handleXHR(reason);
      });
    },

    /**
     * backout, no need to revert since it's a new object
     */
    cancel: function () {
      this.set('isAdding', false);
    }
  }
});
