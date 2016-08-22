import Ember from 'ember';

export default Ember.Component.extend({

  /**
   * track the number of requests for first preference
   */
  pref1Count: Ember.computed('newRequests.[]', 'newRequests.@each.priority', function () {
    return this.get('newRequests').filterBy('priority', 1).length;
  }),

  /**
   * track the number of requests for first preference
   */
  pref2Count: Ember.computed('newRequests.[]', 'newRequests.@each.priority', function () {
    return this.get('newRequests').filterBy('priority', 2).length;
  }),

  /**
   * track the number of requests for first preference
   */
  pref3Count: Ember.computed('newRequests.[]', 'newRequests.@each.priority', function () {
    return this.get('newRequests').filterBy('priority', 3).length;
  })

});
