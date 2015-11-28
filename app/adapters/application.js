import ENV from 'smores-mgr/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ActiveModelAdapter from 'active-model-adapter';

var ApplicationAdapter = ActiveModelAdapter.extend(DataAdapterMixin, {
  authorizer: 'authorizer:application',
  namespace: ENV.APP.restNameSpace,
  host: ENV.APP.restDestination
});

export default ApplicationAdapter;