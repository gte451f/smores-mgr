import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/pager/base-controller';
import Column from 'smores-mgr/mixins/pager/column';

export default Ember.ArrayController.extend(Paginate, {
    //load pager specific variables
    columns: [
        Column.create({'displayName': 'firstName', 'fieldName': 'firstName', 'order': 0}),
        Column.create({'displayName': 'lastName', 'fieldName': 'lastName', 'order': 1}),
        Column.create({'displayName': 'email', 'fieldName': 'email', 'order': 1})
    ],
    //need to open single matter record
    linkPath: "user-mgr.user"
});