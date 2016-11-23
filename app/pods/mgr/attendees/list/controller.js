import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
import Column from 'smores-mgr/mixins/table-pager/column';

const {
  Controller,
} = Ember;

export default Controller.extend(Paginate, {
  queryParams: ['quickSearchField', 'q'],

  q: '',
  quickSearch: '',

  // use the api name for this field
  quickSearchField: 'first_name||last_name',

  //load pager specific variables
  columns: [
    Column.create({displayName: 'First Name', fieldName: 'firstName', order: 0}),
    Column.create({displayName: 'Last Name', fieldName: 'lastName', order: 1}),
    Column.create({displayName: 'Grade', fieldName: 'schoolGrade', apiName: 'school_grade', order: 2}),
    Column.create({displayName: 'Status', fieldName: 'active', order: 3}),
    Column.create({displayName: 'Birthday', fieldName: 'dob', order: 3})
  ],

  //need to open single matter record
  linkPath: "mgr.attendees.info"
});
