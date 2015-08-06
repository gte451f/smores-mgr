import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
//import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {

    // not needed since custom template
    //columns: [],

    // need to open single matter record
    // not needed since we don't open a single session
    linkPath: "sessions"
});