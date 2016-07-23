import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Add Card',

  /**
   * is a save operation currently pending
   */
  cardSaving: false,
});
