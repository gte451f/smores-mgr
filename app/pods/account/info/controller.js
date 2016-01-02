import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/controller';
import CustomFields from 'smores-mgr/mixins/crud/custom-fields';

export default Ember.Controller.extend(Account, CustomFields, {
  breadCrumb: 'Info',

  // configure custom fields base table
  baseTable: 'accounts'
});
