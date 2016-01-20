import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {
  //load pager specific variables
  columns: [
    Column.create({'displayName': 'Location', 'fieldName': 'location.name', 'order': 1}),
    Column.create({'displayName': 'Program', 'fieldName': 'program.name', 'order': 2}),
    Column.create({'displayName': 'Cabin', 'fieldName': 'cabin.name', 'order': 3}),
    Column.create({'displayName': 'Session', 'fieldName': 'session.name', 'order': 4})
  ],
  //need to open single matter record
  linkPath: 'mgr.setup.events.info',

  // update query params so a user can return to the filtered list
  queryParams: ["page", "perPage", "sortField", "location_id", "program_id", "cabin_id", "session_id"],
  program_id: null,
  location_id: null,

  // monitor and update pager when this changes
  // use this two stage approach to cut down on the number of repeat requests
  // notice a pass to the route's refresh action
  filterChanged: Ember.observer('location_id', 'program_id', 'cabin_id', 'session_id', function () {
    Ember.run.once(this, 'processChange');
  }),

  processChange: function () {
    this.send('refresh');
  }
});