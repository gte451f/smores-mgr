import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

/**
 * a general purpose tooltip styled for admin-lte
 * see ember-cli-tooltipster for usage
 */
export default TooltipsterComponent.extend({
  tagName: 'span',
  classNames: ['badge bg-light-blue'],
  title: 'Help',
  position: 'top',
  theme: 'tooltipster-default',
  timer: 10000
});
