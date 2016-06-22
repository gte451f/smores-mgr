import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/route';

export default Ember.Route.extend(Paginate, {
  modelName: 'attendee',
  controllerName: 'mgr.attendees.list',

  queryParams: {
    quickSearchField: {
      refreshModel: true
    },
    q: {
      refreshModel: true
    }
  },

  model: function (params) {
    // remove the query params b/c are sent to the backend and return error
    delete params.q;
    delete params.quickSearchField;
    return this._super(params);
  },

  setupController: function (controller, resolved) {
    this._super(controller, resolved);
    if (typeof controller.get('quickSearch') === 'string') {
      controller.set('q', controller.get('quickSearch'));
    }
  },
  actions: {
    // https://github.com/emberjs/ember.js/issues/5566
    queryParamsDidChange: function () {
      Ember.run.next(this, 'refresh');
    }
  }
});
