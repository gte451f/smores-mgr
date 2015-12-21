import Ember from 'ember';

export default Ember.Service.extend({

  /**
   * the currently "open" account
   */
  account: null,

  /**
   * quick access to the account_id
   */
  id: null,

  /**
   * store the current route so menus can be updated
   */
  currentRoute: null,


});