import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';

var Item = Ember.Object.extend({id: '', name: ''});

export default Ember.Controller.extend(Error, {
  notify: Ember.inject.service(),
  registration: Ember.inject.service(),

  // used to trigger updating the suggestions array after the remote store has time to update the options array
  triggerSuggestions: 1,

  selectOptions: [],

  actions: {
    // triggers when a value has been selected in the auto suggest
    itemSelected: function (item) {
      this.set('attendee', item);
      this.set('registration.camper', item.get('camper'));
    },
    // when the user types new values into the select box
    refreshOptions: function (inputVal) {
      var self = this;
      clearTimeout(this.keyDownTimer);

      this.set('keyDownTimer', setTimeout(function () {
        var wildcard = '*';

        self.store.findQuery('attendee', {
          'first_name||last_name': wildcard + inputVal + wildcard,
          limit: 20,
          sortField: 'last_name,first_name'
        }).then(function (data) {
          var optionsList = [];

          // build generic object from each client object and add to optionsList array
          data.forEach(function (attendee) {
            var item = Item.create({
              id: attendee.get('id'),
              name: attendee.get('fullName'),
              camper: attendee
            });
            optionsList.pushObject(item);
          });

          // set optionsList on the controller
          self.set('selectOptions', optionsList);
        }, function (reason) {
          self.handleXHR(reason);
          return false;
        });

      }, 400));

    }
  }
});
