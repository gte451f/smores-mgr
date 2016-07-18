import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Component.extend(Error, {
  notify: Ember.inject.service(),

  /**
   * is the form editing a phone number anywhere?
   */
  isEditing: false,
  /**
   * is this the phone number being edited?
   */
  localEditing: false,

  actions: {
    /**
     * toggle to edit mode
     */
    edit: function () {
      this.set('isEditing', true);
      this.set('localEditing', true);
    },

    /**
     * cancel out of edit mode
     * reset changes
     */
    cancel: function (phone) {
      this.set('isEditing', false);
      this.set('localEditing', false);
      phone.rollbackAttributes();
    },

    /**
     * remove the phone record
     * @param phone
     */
    delete: function (phone) {
      phone.destroyRecord();
    },

    /**
     * save the existing phone number
     * @param model
     */
    save: function (number) {
      number.save().then((data) => {
        this.get('notify').success('Phone Number Saved');
        this.set('isEditing', false);
        this.set('localEditing', false);
      }, function (reason) {
        this.handleXHR(reason);
      });
    }
  }
});
