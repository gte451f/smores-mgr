import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/route';

export default Ember.Route.extend(Paginate, {
    modelName: 'session',
    controllerName: 'sessions',
    currentRoute: 'sessions',
    actions: {
        //wipe the supplied record and go back to the mother ship
        delete: function (model) {
            var self = this;
            var controller = this.controllerFor('sessions');
            model.destroyRecord().then(function () {
                controller.get('model').content.removeObject(model);
                self.notify.success('Successfully removed session');
                self.transitionTo('sessions');
            }, function (reason) {
                console.log(reason);
                self.notify.error('Could not delete record!');
            });
        }
    }
});
