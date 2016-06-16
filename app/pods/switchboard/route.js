import Ember from 'ember';

export default Ember.Route.extend({
    session: Ember.inject.service(),

    /**
     * function to figure out where lost users should land
     */
    beforeModel: function () {
        if (this.get('session.isAuthenticated')) {
            let userType = this.get('session.data.authenticated.data.attributes.user-type')

            if (userType === 'Owner') {
                this.transitionTo('client.dash');
            } else if (userType === 'Employee') {
                this.transitionTo('mgr.dash');
            }
        } else {
            // must assume client since not authenticated
            this.transitionTo('client.auth.login');
        }
    }

});
