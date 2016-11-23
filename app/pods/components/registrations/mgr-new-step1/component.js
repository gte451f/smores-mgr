import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    /** power-select for attendees */
    searchAttendees: function (term) {
      return new Ember.RSVP.Promise((resolve, reject) => {
        Ember.run.debounce(this, this.performSearch, term, resolve, reject, 600);
      });
    }
  },
  /**
   * logic to perform actual search for attendee records
   *
   * @param term
   * @param resolve
   * @param reject
   * @returns {*}
   */
  performSearch(term, resolve, reject) {
    var store = this.get('targetObject.store');
    return store.query('attendee', {
      'first_name||last_name': '*' + term + '*',
      limit: 100,
      sortField: 'last_name'
    }).then((items) => resolve(items));
  }
});
