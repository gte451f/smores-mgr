import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

export default Ember.Route.extend(ErrorHandler, AuthenticatedRouteMixin, {
  notify: Ember.inject.service(),

  model: function (params) {
    return this.store.findAll('setting');
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
