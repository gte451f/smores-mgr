import ENV from 'smores-mgr/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import DS from 'ember-data';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: ENV.APP.restNameSpace,
  host: ENV.APP.restDestination,

  // added this in response to deprecation
  // http://emberjs.com/api/data/classes/DS.Adapter.html#method_shouldReloadAll
  shouldReloadAll() {
    return true;
  }
});
