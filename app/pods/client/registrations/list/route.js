import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(AuthenticatedRouteMixin, {

    model: function (params) {
        var sessionData = this.get('session.data.authenticated');
        return this.store.query('registration', {'attendees:account_id': sessionData.accountId, with: 'all'});
    }
});