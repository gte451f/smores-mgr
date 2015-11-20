import Ember from 'ember';

export default Ember.Route.extend({
  registration: Ember.inject.service(),

  /**
   * set wizard token since this is the start
   *
   * @returns {boolean}
   */
  activate: function () {
    this.get('registration').set('wizardToken', 'step1');
    return true;
  }
});