import Ember from 'ember';

export default Ember.Component.extend({
  /**
   * descriptive text for user display
   */
  title: 'Edit Owner Information',

  /**
   * used to control the behavior of the spinner button component
   */
  isSaving: false
});
