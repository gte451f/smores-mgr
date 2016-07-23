import Component from 'ember-modal-dialog/components/modal-dialog';

export default Component.extend({
  translucentOverlay: true, // override default of false
  containerClassNames: 'confirm-modal',
  destinationElementId: 'modal-overlays',

  /**
   * used to control the behavior of the spinner button component
   */
  isPending: false
});
