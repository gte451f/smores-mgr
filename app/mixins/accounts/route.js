import Ember from 'ember';

/**
 * helper to deal with events coming out of tab component
 */
export default Ember.Mixin.create({

  actions: {
    // triggers when a value has been selected in the auto suggest
    redirect: function (item) {
      this.set('account', item);
      //transition to!
      this.transitionTo('accounts.info', item.accountId);
    }
  }

});
