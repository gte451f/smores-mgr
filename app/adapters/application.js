import DS from 'ember-data';
import ENV from 'smores-mgr/config/environment';
import ActiveModelAdapter from 'active-model-adapter';

var ApplicationAdapter = ActiveModelAdapter.extend({
  //ajaxError: function (jqXHR) {
  //  debugger;
  //},
  namespace: ENV.APP.restNameSpace,
  host: ENV.APP.restDestination
});

export default ApplicationAdapter;