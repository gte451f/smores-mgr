import Ember from 'ember';

export default Ember.Controller.extend({
    // the selected attendee model
    attendee: null,
    // the selected user model,
    user: null,

    registrationNotes: null,

    // used to trigger updating the suggestions array after the remote store has time to update the options array
    triggerSuggestions: 1,

    actions: {
        // triggers when a value has been selected in the auto suggest
        itemSelected: function (item) {
            this.set('attendee', item);
        },
        // when the user types new values into the select box
        refreshOptions: function (inputVal) {
            var wildcard = '*';
            var self = this;
            var triggerSuggestions = this.get('triggerSuggestions');


            self.store.findQuery('attendee', {
                'first_name||last_name': wildcard + inputVal + wildcard,
                limit: 20,
                sortField: 'last_name,first_name'
            }).then(function (data) {
                self.set('users', data);
                triggerSuggestions = triggerSuggestions + 1;
                self.set('triggerSuggestions', triggerSuggestions);
            });
        }
    }
});
