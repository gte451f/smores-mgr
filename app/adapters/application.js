import ENV from 'smores-mgr/config/environment';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';

export default DS.JSONAPIAdapter.extend(DataAdapterMixin, {
    authorizer: 'authorizer:application',
    namespace: ENV.APP.restNameSpace,
    host: ENV.APP.restDestination
});