import Ember from 'ember';

export default Ember.Service.extend({
  /**
   * the camper attending camp
   */
  camper: null,

  /**
   * how many sessions will the camper attend?
   * single = 0
   * multi = 0
   */
  mode: 0,

  /**
   * anything the parent wants to say to camp staff about this registration
   */
  registrationNote: null,

  /**
   * array of requests the camper asks for
   * each request should look like this at a minimum:
   * {priority: #, event: object}
   */
  requests: [],

  /**
   * an empty request object
   * the cutter for your cookies
   */
  requestContainer: Ember.Object.extend({
    location: null,
    event: null,
    program: null,
    note: null,
    priority: null
  }),

  /**
   * store a marker for session type persistence across wizard steps
   * use this token to detect restarts
   * start|step1|step2|step3
   */
  wizardToken: 'start',

  /**
   * reset a registration back to its original state
   */
  resetRegistration(){
    this.set('camper', null);
    this.set('mode', 0);
    this.set('registrationNote', null);
    this.set('requests', []);
    this.set('wizardToken', 'start');
  },

  addRequest(request){
    this.get('requests').pushObject(request);
  },

  /**
   * show a preference be displayed?
   * @param pref
   * @returns {boolean}
   */
  showPref(pref){
    return true;
  }
});
