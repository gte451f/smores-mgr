import Ember from 'ember';

export default Ember.Route.extend({
  registration: Ember.inject.service(),

  /**
   * load fees for confirmation page
   * @param params
   * @returns {*}
   */
  model: function (params) {
    //params.event_id
    return Ember.RSVP.hash({
      model: {},
      fees: this.store.query('fee', {basis: 'Registration'})
    });
  },

  /**
   * setup step3 with all registration fees
   * @param controller
   * @param resolved
   */
  setupController: function (controller, resolved) {
    this._super(controller, resolved.model);
    controller.set('fees', resolved.fees);
  },

  /**
   * redirect to the beginning if loading this page fresh
   */
  activate: function () {
    if (this.get('registration.wizardToken') === 'start') {
      this.transitionTo('registrations.add.step1');
    } else {
      this.get('registration').set('wizardToken', 'step3');
    }
    return true;
  }
});
