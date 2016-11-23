import Ember from 'ember';

import NewRegController from 'smores-mgr/mixins/crud/registrations/new-controller';

export default Ember.Controller.extend(NewRegController, {
  notify: Ember.inject.service(),
  breadCrumb: 'New',



});
