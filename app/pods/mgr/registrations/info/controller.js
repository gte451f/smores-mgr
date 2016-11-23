import Ember from 'ember';
import CustomFields from 'smores-mgr/mixins/crud/custom-fields';

export default Ember.Controller.extend(CustomFields, {
  breadCrumb: 'Info',

  // configure custom fields base table
  baseTable: 'registrations',

  // where does the back button return to?
  queryParams: ['origin'],
  origin: null
});
