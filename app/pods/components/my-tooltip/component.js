//components/my-button.js
import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
  tagName: 'span',

  classNames: ['badge bg-light-blue'],

  // define properties
  title: 'Help',

  position: 'top',

  theme: 'tooltipster-default',

  timer: 10000
});