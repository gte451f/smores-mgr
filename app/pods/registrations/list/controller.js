import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {
    //load pager specific variables
    columns: [
        Column.create({'displayName': '#', 'fieldName': 'id', 'order': 0}),
        Column.create({'displayName': 'First', 'fieldName': 'user.firstName', 'order': 1}),
        Column.create({'displayName': 'Last', 'fieldName': 'user.lastName', 'order': 2}),
        Column.create({'displayName': 'Created', 'fieldName': 'createdOn', 'order': 2}),
        Column.create({'displayName': 'Notes', 'fieldName': 'notes', 'order': 4})
    ],
    //need to open single matter record
    linkPath: "registrations.info",

    quickSearchField: false,

    tableTitle: false

});
