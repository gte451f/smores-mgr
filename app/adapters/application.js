import ENV from 'smores-mgr/config/environment';
import ActiveModelAdapter from 'active-model-adapter';

var ApplicationAdapter = ActiveModelAdapter.extend({
  namespace: ENV.APP.restNameSpace,
  host: ENV.APP.restDestination
});

export default ApplicationAdapter;