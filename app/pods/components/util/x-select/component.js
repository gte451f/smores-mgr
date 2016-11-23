import EmberPowerSelect from 'ember-power-select/components/power-select';

/**
 * extend default power-select to apply some global settings
 */
export default EmberPowerSelect.extend({
  // wrap power-select in a div so we can assign a class name
  tagName: 'div'
});
