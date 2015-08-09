import Ember from 'ember';
var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});

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
            var self = this;
            this.store.query('attendee', item.id).then(function (item) {
                self.set('attendee', item);
                self.set('user', item);
            });
        },
        // when the user types new values into the select box
        refreshOptions: function (inputVal) {
            var users = [];
            var wildcard = '*';
            var self = this;
            var triggerSuggestions = this.get('triggerSuggestions');

            return Ember.RSVP.hash({
                firstName: this.store.query('attendee', {first_name: inputVal + wildcard, limit: 25}),
                lastName: this.store.query('attendee', {last_name: inputVal + wildcard, limit: 25})
            }).then(function (hash) {
                hash.lastName.forEach(function (item) {
                    var found = users.isAny('id', item.get('id'));
                    if (found === false) {
                        var full = item.get('lastName') + ', ' + item.get('firstName') + ' - ' + item.get('schoolGrade');
                        users.pushObject(User.create({
                            id: item.get('id'),
                            fullName: full,
                            firstName: item.get('firstName'),
                            lastName: item.get('lastName'),
                            accountId: item.get('account.id')
                        }));
                    }
                });

                hash.firstName.forEach(function (item) {
                    var found = users.isAny('id', item.get('id'));
                    if (found === false) {
                        var full = item.get('lastName') + ', ' + item.get('firstName') + ' - ' + item.get('schoolGrade');
                        users.pushObject(User.create({
                            id: item.get('id'),
                            fullName: full,
                            firstName: item.get('firstName'),
                            lastName: item.get('lastName'),
                            accountId: item.get('account.id')
                        }));
                    }
                });

                // handy dandy sort feature
                var userList = Ember.ArrayProxy.createWithMixins(Ember.SortableMixin, {
                    sortProperties: ['lastName'],
                    sortAscending: false,
                    content: users
                });

                self.set('users', userList);
                triggerSuggestions = triggerSuggestions + 1;
                self.set('triggerSuggestions', triggerSuggestions);
            });
        }
    }
});
