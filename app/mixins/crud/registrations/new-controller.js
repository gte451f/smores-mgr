import Ember from 'ember';

export default Ember.Mixin.create({
  // current step data
  currentStep: 1,
  // make this the same as the first wizard step
  stepTitle: 'Choose Attendee',

  // either single or multiple
  registrationMode: 'Single',

  // store all requests that are to be saved with the registration
  newRequests: [],

  /**
   * auto calc the maximum step in the wizard
   */
  maxStep: Ember.computed('wizardSteps', function () {
    return this.get('wizardSteps').length;
  }),
  /**
   * show the previous step?
   */
  showPrev: Ember.computed('currentStep', 'maxStep', function () {
    return (this.get('currentStep') <= 1) ? false : true;
  }),
  /**
   * show the next step?
   */
  showNext: Ember.computed('currentStep', 'maxStep', function () {
    return (this.get('currentStep') < this.get('maxStep')) ? true : false;
  }),

  prevButtonText: 'Previous',
  nextButtonText: 'Next',

  wizardSteps: [{title: 'Choose Attendee', step: 1}, {title: 'Choose Events', step: 2}, {
    title: 'Review Registration',
    step: 3
  }],


  actions: {
    /**
     * got to the next step
     */
    next(){
      if (this.get('currentStep') < this.get('maxStep')) {
        var nextStep = this.get('currentStep') + 1;

        // validate step 1 before we move to next step
        if (this.get('currentStep') === 1) {
          if (Ember.isEmpty(this.get('model.registration.attendee'))) {
            this.get('notify').alert('Must select a camper before proceeding.');
            return;
          }
        }

        this.set('currentStep', nextStep);
        // now set the title
        let currentWizard = this.get('wizardSteps').findBy('step', this.get('currentStep'));
        this.set('stepTitle', currentWizard.title);
      } else {
        // max step reached!
      }
    },
    /**
     * got to the previous step
     */
    prev(){
      if (this.get('currentStep') > 1) {
        this.set('currentStep', this.get('currentStep') - 1);
        // now set the title
        let currentWizard = this.get('wizardSteps').findBy('step', this.get('currentStep'));
        this.set('stepTitle', currentWizard.title);
      } else {
        // min step reached!
      }
    }
  }

});
