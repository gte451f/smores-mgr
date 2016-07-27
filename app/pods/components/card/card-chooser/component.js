import Ember from 'ember';

export default Ember.Component.extend({
  // should we expect to use a new card or an existing card?
  useNewCard: true,
  toggleText: Ember.computed('useNewCard', function () {
    if (this.get('useNewCard')) {
      return 'Switch to Existing Card';
    } else {
      return 'Switch to add New Card';
    }
  })
});
