import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

export default Ember.Controller.extend(Error, {
  notify: Ember.inject.service(),

  breadCrumb: 'Edit',

  // where does the back button return to?
  queryParams: ['origin'],
  origin: null,

  actions: {
    /**
     * add a request record for a particular registration
     */
    addRequest() {
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

    /**
     * save a series of requests for the existing registration
     */
    save() {
      var self = this;
      //array a billables that should be saved before the billable group is saved
      var subItems = [];

      // a function to save a sub-item, in this case a request
      var subItemSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      //add requests...but only if dirty
      this.get('model.requests').map(function (item) {
        // check receipts for expense only
        if (item.get('isDirty')) {
          subItems.push(subItemSave(item));
        }
      });

      Ember.RSVP.all(subItems).then(function () {
        self.get('notify').success('Success editing registration');
        self.transitionToRoute('mgr.registrations.info', self.get('model.id'));
      }, function (reason) {
        self.handleXHR(reason);
      });
    },

    /**
     * remove a request record from the store and possibly from the API
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
