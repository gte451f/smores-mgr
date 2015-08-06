//components/my-button.js
import TooltipsterComponent from 'ember-cli-tooltipster/components/tool-tipster';

export default TooltipsterComponent.extend({
    tagName: 'span',

    classNames: ['input-group-addon'],

    // define properties
    title: 'Help',

    position: 'top'

});