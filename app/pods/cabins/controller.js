import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
// import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {
    // not needed since we use custom variables
    //columns: [],

    // no needed since we don't open a single cabin
    linkPath: "cabins"
});