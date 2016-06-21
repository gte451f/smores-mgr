import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

/**
 * a tooltip designed to work in an input styled for admin-lte
 * see ember-cli-tooltipster for usage
 */
export default TooltipsterComponent.extend({
  tagName: 'span',
  classNames: ['input-group-addon'],
  title: 'Help',
  position: 'top'
});
