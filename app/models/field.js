import DS from 'ember-data';

export default DS.Model.extend({
  name: DS.attr('string'),
  display: DS.attr('string'),
  input: DS.attr('string'),
  table: DS.attr('string'),
  allowedData: DS.attr('string'),
  possibleValues: DS.attr('string'),
  private: DS.attr('number'),

  //calculate
  enableAllowedValues: Ember.computed('input', function () {
    if (this.get('input') === 'select') {
      return true;
    }
    if (this.get('input') === 'checkbox') {
      return true;
    }
    if (this.get('input') === 'radio') {
      return true;
    }
    return false;
  }),

  modelName: Ember.computed('name', function () {
    return this.get('name').camelize();
  })
});
