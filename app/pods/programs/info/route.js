import Ember from 'ember';

export default Ember.Route.extend({

    actions: {
        //wipe the supplied record and go back to the mother ship
        delete: function (model) {
            var self = this;
            var controller = this.controllerFor('locations');
            model.destroyRecord().then(function () {
                controller.get('model').content.removeObject(model);
                self.notify.success('Successfully removed location');
                self.transitionTo('locations');
            }, function (reason) {
                console.log(reason);
                self.notify.error('Could not delete record!');
            });
        }
    }
});
