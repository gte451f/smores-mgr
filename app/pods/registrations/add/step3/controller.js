import Ember from 'ember';

export default Ember.Controller.extend({
    needs: ['registrations/add/step2', 'registrations/add/step1', 'registrations/list'],

    list: Ember.computed.alias("controllers.registrations/list"),
    step2: Ember.computed.alias("controllers.registrations/add/step2"),
    step1: Ember.computed.alias("controllers.registrations/add/step1"),

    actions: {
        save: function () {
            var self = this;
            var step2 = this.get('step2');
            var step1 = this.get('step1');
            //var list = this.get('list');

            //first save a registration
            var data = {
                attendee: step1.get('attendee'),
                notes: step1.get('registrationNote')
            };
            var registration = this.store.createRecord('registration', data);

            //array a billables that should be saved before the billable group is saved
            var subItems = [];

            // a function to save a sub-item
            var subItemSave = function (item) {
                //console.log('save updated record');
                return item.save();
            };

            function success(post) {
                //now add requests for the registration
                var requests = step2.get('requests');
                var requestCount = requests.length;
                //var listModel = list.get('model');
                var registrationId = post.get('id');

                requests.forEach(function (item, index, enumerable) {
                    var data = {
                        event: item.get('event'),
                        registration: post,
                        priority: item.get('priority'),
                        note: item.get('note')
                    };
                    var request = self.store.createRecord('request', data);
                    subItems.push(subItemSave(request));
                }, this);


                Ember.RSVP.all(subItems).then(function () {
                    // listModel.content.addRecord(post);
                    self.notify.success('Success saving registration including ' + requestCount + ' individual requests.');
                    self.transitionToRoute('registrations.info', registrationId);
                }, failure);
            }

            function failure(reason) {
                // handle the error
                //console.log(reason);
                //var foo = reason.responseJSON;
                var errorHTML = '<strong>' + reason.responseJSON.records.userMessage + '</strong> <br/>';
                reason.responseJSON.records.validationList.forEach(function (item) {
                    errorHTML = errorHTML + item.message + '<br/>';
                }, this);

                self.notify.warning({raw: errorHTML});
            }

            registration.save().then(success, failure);
        }
    }
});
