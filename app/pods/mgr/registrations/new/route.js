import Ember from 'ember';

import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';
import NewRegRoute from 'smores-mgr/mixins/crud/registrations/new-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, NewRegRoute, {
  afterSaveRoute: 'mgr.registrations.info'

});
