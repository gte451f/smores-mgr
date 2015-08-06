import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['events/list'],
    actions: {
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                // only push to array if we've already loaded any records into the array
                self.get('controllers.events/list').get('model').content.addRecord(post);
                self.notify.success('Success saving event!');
                self.transitionToRoute('events.list');
            }, function (reason) {
                self.handleXHR(reason);
            });
        }
    }
});
