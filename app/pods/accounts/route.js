import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/pager/base-route';

export default Ember.Route.extend(Paginate, {
    modelName: 'account',
    controllerName: 'accounts',
    currentRoute: 'accounts'
});
