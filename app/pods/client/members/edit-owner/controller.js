import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Edit Owner',

  /**
   * toggle whether to display the new phone number form
   */
  isAdding: false,

  /**
   * toggle whether to display other phone numbers...hide when editing a single phone number
   */
  isEditing: false,

  actions: {
    /**
     * trigger new phone form and reset the phone object
     */
    toggleNewPhone: function () {
      this.set('isAdding', true);
      let newPhone = this.store.createRecord('owner-number', {primary: 0});
      this.set('newPhone', newPhone);
    }
  }
});
