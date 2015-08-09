import Ember from 'ember';
var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});

export default Ember.Controller.extend({
    account: null,

    actions: {
        // triggers when a value has been selected in the auto suggest
        itemSelected: function (item) {
            this.set('model', item);
            //transition to!
            this.transitionToRoute('accounts.info', item.accountId);

        },
        // when the user types new values into the select box
        refreshOptions: function (inputVal) {
            var users = [];
            var wildcard = '*';
            var self = this;
            var triggerSuggestions = this.get('triggerSuggestions');

            return Ember.RSVP.hash({
                attendees: this.store.query('attendee', {last_name: inputVal + wildcard, limit: 25, with: 'accounts'}),
                owners: this.store.query('owner', {last_name: inputVal + wildcard, limit: 25, with: 'accounts'})
            }).then(function (hash) {
                hash.attendees.forEach(function (item) {
                    var full = item.get('lastName') + ', ' + item.get('firstName') + ' - ' + item.get('schoolGrade');
                    users.pushObject(User.create({
                        id: item.get('id'),
                        fullName: full,
                        firstName: item.get('firstName'),
                        lastName: item.get('lastName'),
                        accountId: item.get('account.id')
                    }));
                });

                hash.owners.forEach(function (item) {
                    var full = item.get('lastName') + ', ' + item.get('firstName');
                    users.pushObject(User.create({
                        id: item.get('id'),
                        fullName: full,
                        firstName: item.get('firstName'),
                        lastName: item.get('lastName'),
                        accountId: item.get('account.id')
                    }));
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
    },
    // used to trigger updating the suggestions array after the remote store has time to update the options array
    triggerSuggestions: 1
});
