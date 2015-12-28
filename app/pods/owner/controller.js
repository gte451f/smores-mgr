import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Owners',

  // load registration fields for display
  ownerFields: Ember.computed(function () {
    return this.store.peekAll('field').filter(function (item) {
      if (item.get('table') === 'owners') {
        return true;
      }
      return false;
    });
  })
});
