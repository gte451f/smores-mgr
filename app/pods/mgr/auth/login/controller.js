import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    /**
     * handle login form authenticate request
     * TODO validate inputs
     */
    authenticate() {
      console.log('action to attempt to authenticate');
      let {identification, password} = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:custom', identification, password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
      console.log('complete mgr.auth.login.controller authenticate action');
    }
  }
});
