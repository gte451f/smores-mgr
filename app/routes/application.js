import Ember from 'ember';
// install simple-auth for all routes
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
// export default Ember.Route.extend({
  session: Ember.inject.service(),
  redirectsTo: 'client.auth.login',

  // store userType in stateful property
  userType: null,

  /**
   * session is destroyed, now go to the correct login page
   * depending on user type
   */
  sessionInvalidated() {
    let userType = this.get('userType');
    if (userType === 'Owner') {
      this.transitionTo('client.auth.login');
    }
    if (userType === 'Employee') {
      this.transitionTo('mgr.auth.login');
    }
  },

  /**
   * session was just created, now go to the default route
   * depending on user type
   */
  sessionAuthenticated() {

    let userType = this.get('session.data.authenticated.data.attributes.user-type');
    this.set('userType', userType);
    if (userType === 'Owner') {
      this.transitionTo('client.dash');
    }
    if (userType === 'Employee') {
      this.transitionTo('mgr.dash');
    }
  },

  actions: {
    /**
     * logout action required by simple-auth
     */
    invalidateSession() {
      var self = this;
      let userType = this.get('session.data.authenticated.data.attributes.user-type');
      this.get('session').invalidate().then(function () {
        if (userType === 'Owner') {
          self.transitionTo('client.auth.login');
        }
        if (userType === 'Employee') {
          self.transitionTo('mgr.auth.login');
        }
      });
    },

    /**
     * utility function used around the app to show a modal with different types of content
     *
     * @param name
     * @param model
     */
    showModal(name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },

    /**
     * utility function to close a modal
     */
    removeModal() {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },

    /**
     * utility to toggle the side bar open and closed
     */
    showSidebar() {
      Ember.$('#mainWrapper').toggleClass('sidebar-collapse');
    }
  }
});
