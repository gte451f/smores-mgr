import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});

export default Ember.Route.extend(ErrorHandler, {
    model: function () {
        return Ember.RSVP.hash({
            model: User.create()
        });
    },
    setupController: function (controller, resolved) {
        controller.set("model", resolved.model);
        var users = [];
        controller.set("users", users);
    }
});