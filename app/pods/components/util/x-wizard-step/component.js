import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'li',
  attributeBindings: ['displayIndex:data-step'],
  classNameBindings: ['isActive:active'],
  index: null,
  displayIndex: Ember.computed('index', function () {
    return this.get('index') + 1;
  }),
  isActive: Ember.computed('activeIndex', 'index', function () {
    return this.get('activeIndex') === this.get('index');
  })
});
