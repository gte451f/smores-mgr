import Ember from 'ember';
//install simple-auth for all routes
import ApplicationRouteMixin from 'simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
    redirectsTo: 'dash',

    actions: {
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
            if (!Ember.testing) {
                //this.transitionTo('auth.login');
                window.location.replace('auth/login');
            }
        }
    }
});
