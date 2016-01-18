import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  /**
   * catch function and send the user back to the correct route
   */
  beforeModel: function () {
    if (this.get('session.isAuthenticated')) {
      this.transitionTo('client.dash');
    } else {
      this.transitionTo('client.auth.login');
    }
  }
});
