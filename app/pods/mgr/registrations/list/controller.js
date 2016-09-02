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
  quickSearchField: 'attendee:first_name||attendee:last_name',

  //load pager specific variables
  columns: [
    Column.create({displayName: '#', fieldName: 'id', order: 0}),
    Column.create({displayName: 'First', fieldName: 'attendee.firstName', apiName: 'attendee:first_name', order: 1}),
    Column.create({displayName: 'Last', fieldName: 'attendee.lastName', order: 2}),
    Column.create({displayName: 'Created', fieldName: 'createdOn', order: 2}),
    Column.create({displayName: 'Notes', fieldName: 'notes', order: 4})
  ],

  //need to open single matter record
  linkPath: 'mgr.registrations.info',
  editPath: 'mgr.registrations.edit'
});

