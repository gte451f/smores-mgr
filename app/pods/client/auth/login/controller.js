import Ember from 'ember';
import ENV from 'smores-mgr/config/environment';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  campName: ENV.camp.name,
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
      console.log('complete auth.login.controller authenticate action');
    }
  }
});
