import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['displayIndex:data-step'],
  classNameBindings: ['isActive:active'],

  // this step's number
  step: null,

  /**
   * determine if this step is the current step
   */
  isActive: Ember.computed('currentStep', 'step', function () {
    return this.get('currentStep') === this.get('step');
  })
});
