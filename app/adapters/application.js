import ENV from 'smores-mgr/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';
import {pluralize} from 'ember-inflector';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: ENV.APP.restNameSpace,
  host: ENV.APP.restDestination,

  /**
   * prefer underscore to dasherized end points
   * make sure all end points are plural...which the parent function did,
   * included since we had to extend
   *
   * @param type
   * @returns {*}
   */
  pathForType: function (type) {
    let name = Ember.String.underscore(type);
    return pluralize(name);
  },

  // added this in response to deprecation
  // http://emberjs.com/api/data/classes/DS.Adapter.html#method_shouldReloadAll
  shouldReloadAll() {
    return true;
  }
});
