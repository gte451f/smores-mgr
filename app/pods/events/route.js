import Ember from 'ember';

export default Ember.Route.extend({
    redirectsTo: 'dash',
    actions: {
        //wipe the supplied record and go back to the mother ship
        delete: function (model) {
            var self = this;
            model.destroyRecord().then(function () {
                self.notify.success('Successfully removed event!');
                self.transitionTo('events.list');
            }, function (reason) {
                console.log(reason);
                self.notify.error('Could not delete record!');
            });
        }
    }
});