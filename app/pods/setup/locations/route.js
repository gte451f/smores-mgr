import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/pager/base-route';

export default Ember.Route.extend(Paginate, {
    modelName: 'location',
    controllerName: 'setup.locations',
    currentRoute: 'setup.locations'
});
