import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  notify: Ember.inject.service(),

  model: function (params) {
    //params.event_id
    return Ember.RSVP.hash({
      model: this.store.findAll('setting'),
      locations: this.store.findAll('location'),
      programs: this.store.findAll('program'),
      events: this.store.findAll('event'),
      sessions: this.store.findAll('session'),
      cabins: this.store.findAll('cabin')
    });
  },

  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);
    controller.set('model.locationCount', this.store.metadataFor("location").total_record_count);
    controller.set('model.programCount', this.store.metadataFor("program").total_record_count);
    controller.set('model.eventCount', this.store.metadataFor("event").total_record_count);
    controller.set('model.cabinCount', this.store.metadataFor("cabin").total_record_count);
    controller.set('model.sessionCount', this.store.metadataFor("session").total_record_count);
  },

  actions: {
    /**
     * handle save operation on all settings
     * @param model
     */
    save: function (model) {
      var self = this;
      var subItems = [];

      // a function to save a sub-item
      var subItemSave = function (item) {
        //console.log('save updated record');
        return item.save();
      };

      model.forEach(function (item) {
        if (item.get('isDirty')) {
          subItems.push(subItemSave(item));
        }
      }, this);

      Ember.RSVP.all(subItems).then(function () {
        // listModel.content.addRecord(post);
        self.get('notify').success('Settings Saved');
      }, function (reason) {
        self.handleXHR(reason);
      });
    }
  }
});
