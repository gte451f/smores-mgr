import Ember from 'ember';

export default Ember.Mixin.create({
  //
  baseTable: '',

  /**
   * load custom fields for a configured base table
   */
  customFields: Ember.computed('baseTable', function () {
    var baseTable = this.get('baseTable');
    return this.store.peekAll('field').filter(function (item) {
      if (item.get('table') === baseTable) {
        return true;
      }
      return false;
    });
  })
});
