import Ember from 'ember';

/**
 * populate tab component with correct suggest name
 */
export default Ember.Mixin.create({
  suggestedEntry: Ember.computed('model', function () {
    let defaultText = '#' + this.get('model.id') + ' - ' + this.get('model.name');
    return defaultText;
  })
});
