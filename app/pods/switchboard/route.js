import Ember from 'ember';

export default Ember.Route.extend({
  session: Ember.inject.service(),

  /**
   * function to figure out where lost users should land
   */
  beforeModel: function () {
    debugger;
    let isAuthenticated = this.get('session.isAuthenticated');

    if (this.get('session.isAuthenticated')) {
      let userType = this.get('session.data.authenticated.userType');

      if (userType === 'Owner') {
        this.transitionTo('client.dash');
      }
      if (userType === 'Employee') {
        this.transitionTo('mgr.dash');
      }

    } else {
      // must assume client since not authenticated
      this.transitionTo('client.auth.login');
    }
  }

});
