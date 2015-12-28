import Ember from 'ember';
import Account from 'smores-mgr/mixins/accounts/controller';

export default Ember.Controller.extend(Account, {
  breadCrumb: 'Info',

  // load registration fields for display
  accountFields: Ember.computed(function () {
    return this.store.peekAll('field').filter(function (item) {
      if (item.get('table') === 'accounts') {
        return true;
      }
      return false;
    });
  })
});
