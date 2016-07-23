import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Edit Attendee',

  /**
   * is a save operation currently pending
   */
  attendeeSaving: false,

});
