import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
//import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {
    //load pager specific variables
    columns: [],

    sortField: 'user_id',

    //need to open single matter record
    linkPath: "users.info"
});