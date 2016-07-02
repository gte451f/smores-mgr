import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service(),
  //indicate that when this query param changes, refresh the route
  queryParams: {
    terms: {
      refreshModel: true
    }
  },

  /**
   * pull a new list of accounts that match based on the supplied search terms
   * @param params
   * @returns {*}
   */
  model: function (params) {
    if (params.terms === '') {
      return {
        searchValue: params.terms,
        owners: [],
        accounts: []
      };
    } else {
      return Ember.RSVP.hash({
        searchValue: params.terms,
        owners: this.store.query('owner', {last_name: '*' + params.terms + '*', limit: 75, with: 'accounts'}),
        accounts: this.store.query('account', {name: '*' + params.terms + '*', sortField: 'id', with: 'owners'})
      });
    }
  },

  setupController: function (controller, resolved) {
    //process all promises here
    var optionsList = [];

    resolved.accounts.forEach(function (item) {
      optionsList.pushObject(item);
    });

    resolved.owners.forEach(function (item) {

      if (!optionsList.contains(item.get('account'))) {
        optionsList.pushObject(item.get('account'));
      }

    });

    this._super(controller, optionsList);

    if (typeof resolved.searchValue !== 'undefined') {
      controller.set('termsSurrogate', resolved.searchValue);
    }
  },

  actions: {
    // https://github.com/emberjs/ember.js/issues/5566
    queryParamsDidChange: function () {
      Ember.run.next(this, 'refresh');
    }
  }

});
