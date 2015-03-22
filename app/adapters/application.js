import DS from 'ember-data';

var ApplicationAdapter = DS.ActiveModelAdapter.extend({
    //host: 'http://localhost:8080',
    namespace: 'smores-api/v1'
});

export default ApplicationAdapter;