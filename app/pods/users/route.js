import Ember from 'ember';

export default Ember.Route.extend({
    model: function (params) {
        return this.store.query('user', {user_type: 'Employee'});
    }
});