import Ember from 'ember';

/**
 * a small component to display the steps in a wizard
 *
 */
export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['steps'],
  currentPath: null, //passed in value, is current route
  steps: null,
  activeIndex: Ember.computed('currentPath', function () {
    var currentPath = this.get('currentPath');
    var steps = this.get('steps');
    for (var i = 0; i < steps.length; i++) {
      if (steps[i].route === currentPath) {
        return i+1;
      }
    }
  }),

  actions: {
    showHelp: function () {
      console.log('showhelp');
      Ember.$('#helpBox').removeClass("hidden");
    }
  }
});
