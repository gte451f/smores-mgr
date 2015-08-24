import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(ErrorHandler, {
    needs: ['sessions'],
    actions: {
        save: function (model) {
            var self = this;
            model.save().then(function (post) {
                // now add complete record to controller
                var model = self.get('controllers.sessions').get('model');
                model.content.addRecord(post);
                self.notify.success('Success saving session!');
                self.transitionToRoute('sessions');
            }, function (reason) {
                self.validationReport(model);
            });
        }
    }
});
