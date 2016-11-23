import Ember from 'ember';

export default Ember.Component.extend({
  // use these properties to allow a user to choose different payment sources
  enableCash: true,
  enableCredit: true,
  enableCheck: true,


  // text description of current mode
  // used to track toggle button
  mode: 'Credit',

  actions: {
    /**
     * gah, do I need to do this?
     * @param mode
     */
    setMode(mode){
      this.set('mode', mode);
    }
  }
});
