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
  sessionInvalidated: function () {
    let userType = this.get('userType');
    if (userType == 'Owner') {
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
  sessionAuthenticated: function () {
    let userType = this.get('session.data.authenticated.userType')
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
    invalidateSession: function () {
      var self = this;
      let userType = this.get('session.data.authenticated.userType');
      this.get('session').invalidate().then(function () {
        if (userType === 'Owner') {
          self.transitionTo('client.auth.login');
        }
        if (userType === 'Employee') {
          self.transitionTo('mgr.auth.login');
        }
      });
    },

    showModal: function (name, model) {
      this.render(name, {
        into: 'application',
        outlet: 'modal',
        model: model
      });
    },
    removeModal: function () {
      this.disconnectOutlet({
        outlet: 'modal',
        parentView: 'application'
      });
    },
    showSidebar: function () {
      Ember.$('#mainWrapper').toggleClass('sidebar-collapse');
    }
  }
});
