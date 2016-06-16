import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        let accountId = this.get('session.data.authenticated.data.attributes.account-id');
        return this.store.query('registration', {'attendees:account_id': accountId, with: 'all'});
    }
});