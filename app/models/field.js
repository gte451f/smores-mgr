import DS from 'ember-data';
import Ember from 'ember';

export default DS.Model.extend({
  name: DS.attr('string'),
  display: DS.attr('string'),
  input: DS.attr('string'),
  table: DS.attr('string'),
  allowedData: DS.attr('string'),
  possibleValues: DS.attr('string'),
  private: DS.attr('number'),

  // detect if possibleValues should be enabled
  enableAllowedValues: Ember.computed('input', function () {
    if (this.get('input') === 'select') {
      return true;
    }
    if (this.get('input') === 'multi-check') {
      return true;
    }
    if (this.get('input') === 'radio') {
      return true;
    }
    return false;
  }),

  enableInput: Ember.computed('input', function(){
    if (this.get('input') === 'single-check') {
      return false;
    } else if (this.get('input') === 'date') {
      return false;
    }
    return true;
  }),

  // a ember friendly translation of name
  modelName: Ember.computed('name', function () {
    return this.get('name').camelize();
  })
});
