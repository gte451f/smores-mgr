import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(Error, {
  notify: Ember.inject.service(),

  breadCrumb: 'Edit',

  //list of request to submit
  actions: {
    /**
     * add an expense record for a particular matter
     */
    addRequest: function () {
      var requests = this.get('model.requests');
      var newRecord = this.store.createRecord('request', {
        location: null,
        event: null,
        program: null,
        note: null,
        priority: 0,
        registration: this.get('model')
      });
      requests.pushObject(newRecord);
    },

    save: function () {
      var self = this;
      //array a billables that should be saved before the billable group is saved
      var subItems = [];

      // a function to save a sub-item
      var subItemSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      //add billables...but only if dirty
      this.get('model.requests').map(function (item) {
        // check receipts for expense only
        if (item.get('isDirty')) {
          subItems.push(subItemSave(item));
        }
      });

      Ember.RSVP.all(subItems).then(function () {
        self.get('notify').success('Success editing registration');
        self.transitionToRoute('registrations.info', self.get('model.id'));
      }, function (reason) {
        self.handleXHR(reason);
      });
    },

    /**
     * remove an expense record from the store and possibly from the API
     */
    removeRequest(object) {
      var requestList = this.get('model.requests');
      requestList.removeObject(object);
      // remove from api if an ID is present
      if (object.id) {
        object.destroyRecord();
      }
      this.notify('Request deleted.');
    }
  }
});
