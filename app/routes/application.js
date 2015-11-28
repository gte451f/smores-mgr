import Ember from 'ember';
// install simple-auth for all routes
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
// export default Ember.Route.extend({
  session: Ember.inject.service(),
  redirectsTo: 'auth.login',

  actions: {
    /**
     * logout action required by simple-auth
     */
    invalidateSession: function () {
      console.log('logout action caught');
      this.get('session').invalidate();
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
    },

    // destroy session and return to login page
    sessionInvalidationSucceeded: function () {
      console.log('invalidate succeeded');
      if (!Ember.testing) {
        this.transitionTo('auth.login');
        //window.location.replace('auth/login');
      }
    }
  }
});
