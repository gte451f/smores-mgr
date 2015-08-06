import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/route';

export default Ember.Route.extend(Paginate, {

    // ask for additional data to be side-loaded
    model: function (params) {
        params.with = 'attendees';
        return this.findPaged(this.modelName, params);
    },


    modelName: 'registration',
    controllerName: 'registrations.list',
    currentRoute: 'registrations.list',


    actions: {
        //wipe the supplied record and go back to the mother ship
        delete: function (model) {
            var self = this;
            model.destroyRecord().then(function () {
                self.notify.success('Successfully removed registration!');
                // self.transitionTo('registrations.list');
            }, function (reason) {
                self.notify.error('Could not delete record: ' + reason.responseJSON.records.userMessage);
            });
        }
    }
});
