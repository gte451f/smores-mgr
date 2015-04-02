import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/pager/base-controller';
import Column from 'smores-mgr/mixins/pager/column';

export default Ember.ArrayController.extend(Paginate, {
    //load pager specific variables
    columns: [
        Column.create({'displayName': 'First Name', 'fieldName': 'firstName', 'order': 0}),
        Column.create({'displayName': 'Last Name', 'fieldName': 'lastName', 'order': 1}),
        Column.create({'displayName': 'Grade', 'fieldName': 'schoolGrade', 'order': 2})
    ],
    //need to open single matter record
    linkPath: "attendee"
});