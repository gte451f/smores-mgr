import Ember from 'ember';
import ErrorHandler from 'smores-mgr/mixins/crud/error';

export default Ember.Route.extend(ErrorHandler, {
  notify: Ember.inject.service(),
  session: Ember.inject.service(),

  /**
   * track if the model was run and if not force it to reload in afterModel hook
   * this is because after saving a new card, the new card doesn't appear in the list of related cards
   * for the given model
   */
  modelHookRun: false,

  beforeModel(){
    // reset each run
    this.set('modelHookRun', false);
  },

  model (params) {
    this.set('modelHookRun', true);
    return Ember.RSVP.hash({
      cards: this.store.query('card', {account_id: this.get('currentAccount.id')}),
      account: this.store.peekRecord('account', this.get('currentAccount.id'))
    });
  },

  // force model to reload if it didn't run this time
  afterModel(model){
    if (!this.get('modelHookRun')) {
      return model.reload();
    }
  }
});
