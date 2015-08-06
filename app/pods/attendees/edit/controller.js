import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    activeStatus: null,

    actions: {
        save: function (event) {
            var model = this.get('model');
            var self = this;
            model.save().then(function () {
                var id = model.get('id');
                self.transitionToRoute('attendees.info', id);
                self.notify.success('Attendee was saved!');
            }, function (reason) {
                self.handleXHR(reason);
            });
        },
        foo: function (model) {
            if (model.active === 1) {
                model.set('active', 0);
            } else {
                model.set('active', 1);
            }
        }
    }
});
