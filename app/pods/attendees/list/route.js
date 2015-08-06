import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/route';

export default Ember.Route.extend(Paginate, {
    modelName: 'attendee',
    controllerName: 'attendees.list'
});
