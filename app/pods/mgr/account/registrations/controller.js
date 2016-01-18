import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/controller';

export default Ember.Controller.extend(Account, {
  breadCrumb: 'Registrations'
});
