import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/pager/base-controller';
import Column from 'smores-mgr/mixins/pager/column';

export default Ember.ArrayController.extend(Paginate, {
    //load pager specific variables
    columns: [
        Column.create({'displayName': 'Name', 'fieldName': 'name', 'order': 0}),
        Column.create({'displayName': 'Created', 'fieldName': 'createdOn', 'order': 1})
    ],
    //need to open single matter record
    linkPath: "accounts.account"
});