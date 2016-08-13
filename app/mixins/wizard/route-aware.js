import Ember from 'ember';

/**
 * a simple mixin to make the current route available
 *
 */
export default Ember.Mixin.create({
  applicationController: Ember.inject.controller("application"),
  currentPath: Ember.computed('applicationController.currentPath', function () {
    return this.get('applicationController.currentPath');
  }),

});
