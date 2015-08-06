import DS from 'ember-data';
import ENV from 'smores-mgr/config/environment';

var ApplicationAdapter = DS.ActiveModelAdapter.extend({
    namespace: ENV.APP.restNameSpace,
    host: ENV.APP.restDestination
});

export default ApplicationAdapter;