import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/controller';
//import Column from 'smores-mgr/mixins/table-pager/column';

export default Ember.ArrayController.extend(Paginate, {
    // customized on template
    // columns: [],

    //need to open single matter record
    linkPath: "locations.info"


});