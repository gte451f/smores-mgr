import Ember from 'ember';

/**
 * a small component to display the steps in a wizard
 *
 */
export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['steps', 'nav', 'nav-wizard'],

  // an array of steps to render
  steps: null,
  // the current step as an integer
  currentStep: null,

  actions: {
    showHelp: function () {
      console.log('showhelp');
      Ember.$('#helpBox').removeClass("hidden");
    }
  }
});
