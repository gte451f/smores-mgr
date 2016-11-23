import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import CustomFields from 'smores-mgr/mixins/crud/custom-fields';

export default Ember.Controller.extend(ErrorHandler, CustomFields, {
  notify    : Ember.inject.service(),
  breadCrumb: 'Edit',

  // configure custom fields base table
  baseTable: 'owners',


  /**
   * toggle whether to display the new phone number form
   */
  isAdding: false,

  /**
   * is a save operation currently pending
   */
  ownerSaving: false,

  /**
   * toggle whether to display other phone numbers...hide when editing a single phone number
   */
  isEditing: false,


  /**
   * not sure what this is
   */
  activeStatus: null,

  actions: {
    /**
     * trigger new phone form and reset the phone object
     */
    toggleNewPhone() {
      this.set('isAdding', true);
      let newPhone = this.store.createRecord('owner-number', { primary: 0 });
      this.set('newPhone', newPhone);
    }
  }
});
