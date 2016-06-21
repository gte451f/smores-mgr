import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
import Column from 'smores-mgr/mixins/table-pager/column';



const {
  Controller,
  computed,
  inject
} = Ember;
const { reads } = computed;

export default Controller.extend(Paginate, {
  queryParams: ['quickSearchField', 'q'],

  //load pager specific variables
  columns: [
    Column.create({'displayName': 'First Name', 'fieldName': 'firstName', 'order': 0}),
    Column.create({'displayName': 'Last Name', 'fieldName': 'lastName', 'order': 1}),
    Column.create({'displayName': 'Grade', 'fieldName': 'schoolGrade', 'order': 2}),
    Column.create({'displayName': 'Status', 'fieldName': 'active', 'order': 3}),
    Column.create({'displayName': 'Birthday', 'fieldName': 'dob', 'order': 3})
  ],

  appController: inject.controller('application'),
  items: reads('appController.items'),

  //need to open single matter record
  linkPath: "attendees.info"
});
