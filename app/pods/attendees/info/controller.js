import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Info',

  // load registration fields for display
  attendeeFields: Ember.computed(function () {
    return this.store.peekAll('field').filter(function (item) {
      if (item.get('table') === 'attendees') {
        return true;
      }
      return false;
    });
  })
});