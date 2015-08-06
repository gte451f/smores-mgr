import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'li',
    attributeBindings: ['displayIndex:data-step'],
    classNameBindings: ['isActive:active'],
    index: null,
    displayIndex: function () {
        return this.get('index') + 1;
    }.property('index'),
    isActive: function () {
        return this.get('activeIndex') === this.get('index');
    }.property('activeIndex', 'index')
});
