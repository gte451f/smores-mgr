import Ember from 'ember';

/**
 * show card information and include an option to delete the card
 */
export default Ember.Component.extend({
  notify: Ember.inject.service(),

  /**
   * display the confirmation modal?
   */
  deleteModal: false,

  /**
   * is the delete action running?
   */
  isDeleting: false,

  actions: {
    /**
     * delete a credit card from the server
     * @param card
     */
    delete(card) {
      this.set('isDeleting', true);
      card.destroyRecord().then(() => {
        this.get('notify').success('Credit Card Removed');
        this.set('deleteModal', false);
        this.set('isDeleting', false);
      }, function (reason) {
        this.handleFormError(reason);
        this.set('isDeleting', false);
      });
    }
  }

});
