import Ember from 'ember';

export default Ember.Component.extend({
  notify: Ember.inject.service(),
  tagName: 'tr',

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
     * delete a payment from the server...could be a refund if it is a credit card charge
     * @param card
     */
    delete(payment) {
      this.set('isDeleting', true);

      //check for credit card payments, in which case make this a soft delete instead
      let mode = payment.get('mode');
      if (!Ember.isEmpty(mode) && mode === 'Credit') {
        // submit a refund request instead
        payment.set('mode', 'Refund');
        payment.save().then((post) => {
          this.get('notify').success('Charge refunded!');
        }, (reason) => {
          this.handleFormError(reason);
        });
        return;
      }

      payment.destroyRecord().then(() => {
        this.get('notify').success('Payment Removed');
        this.set('deleteModal', false);
        this.set('isDeleting', false);
      }, (reason) => {
        this.handleFormError(reason);
        this.set('isDeleting', false);
      });
    }
  }
});
