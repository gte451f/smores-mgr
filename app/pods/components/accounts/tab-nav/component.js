import Ember from 'ember';
var User = Ember.Object.extend({id: '', fullName: '', firstName: '', lastName: '', accountId: ''});

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['nav nav-tabs', 'pull-right'],
  isRegistration: '',
  isPayment: '',
  isInfo: '',
  isCard: '',

  // suggestedEntry: 'Search by name...',
  // deal with changes to model
  //watchModel: Ember.observer('model', function () {
  //  debugger;
  //  var model = this.get('model');
  //  this.set('suggestedEntry', model.get('firstName'));
  //}),

  // used for auto suggest
  selectOptions: [],

  actions: {
    // triggers when a value has been selected in the auto suggest
    itemSelected: function (item) {
      this.set('foobar', item.get('fullName'));
      // send and action to finally send the damn transition request
      this.sendAction('redirect', item);
    },

    // when the user types new values into the select box
    refreshOptions: function (inputVal) {
      var store = this.get('targetObject.store');
      var self = this;
      clearTimeout(this.keyDownTimer);

      this.set('keyDownTimer', setTimeout(function () {
        var users = [];
        var wildcard = '*';

        return Ember.RSVP.hash({
          //attendees: self.store.query('attendee', {last_name: inputVal + wildcard, limit: 25, with: 'accounts'}),
          owners: store.query('owner', {last_name: inputVal + wildcard, limit: 25, with: 'accounts'})
        }).then(function (hash) {
          //hash.attendees.forEach(function (item) {
          //  var full = item.get('lastName') + ', ' + item.get('firstName') + ' - ' + item.get('schoolGrade');
          //  users.pushObject(User.create({
          //    id: item.get('id'),
          //    fullName: full,
          //    firstName: item.get('firstName'),
          //    lastName: item.get('lastName'),
          //    accountId: item.get('account.id')
          //  }));
          //});

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
          // set optionsList on the controller
          self.set('selectOptions', userList);
        });
      }, 400));
    }
  }
});
