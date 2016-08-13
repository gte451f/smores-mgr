import Ember from 'ember';
import RouteAware from 'smores-mgr/mixins/wizard/route-aware';

/**
 * this seems to pull a value from the route?
 * @param routeVals
 * @param prop
 * @returns {*}
 */
function routeVal(routeVals, prop) {
  return Ember.computed('currentPath', function () {
    var currentRoute = Ember.get(this, 'currentPath');
    var foo = this.get('currentPath');
    var routeValues = Ember.get(this, routeVals);
    for (var i = 0; i < routeValues.length; i++) {
      if (routeValues[i].route === currentRoute) {
        return routeValues[i][prop];
      }
    }
  });
}

export default Ember.Controller.extend(RouteAware, {
  notify: Ember.inject.service(),
  breadCrumb: 'Add',

  registration: Ember.inject.service(),

  routeName: Ember.computed('controllers.application.currentPath', function () {
    return this.get('controllers.application.currentPath');
  }),

  routeValues: [
    Ember.Object.create({
      route: 'client.registrations.add.step1',
      step: 'Choose Attendee',
      next: 'Step 2',
      nextTransition: 'client.registrations.add.step2',
      prevTransition: 'client.registrations.add.step1',
      showNext: true,
      showPrev: false
    }),
    Ember.Object.create({
      route: 'client.registrations.add.step2',
      step: 'Choose Events',
      next: 'Step 3',
      prev: 'Step 1',
      nextTransition: 'client.registrations.add.step3',
      prevTransition: 'client.registrations.add.step1',
      showNext: true,
      showPrev: true
    }),
    Ember.Object.create({
      route: 'client.registrations.add.step3',
      step: 'Review',
      next: 'Make Another',
      prev: 'Step 2',
      nextTransition: 'client.registrations.add.step3',
      prevTransition: 'client.registrations.add.step2',
      showNext: false,
      showPrev: true
    })
  ],
  nextButton: routeVal('routeValues', 'next'),
  prevButton: routeVal('routeValues', 'prev'),
  nextTransition: routeVal('routeValues', 'nextTransition'),
  showButtons: routeVal('routeValues', 'showButtons'),
  prevTransition: routeVal('routeValues', 'prevTransition'),
  showNext: routeVal('routeValues', 'showNext'),
  showPrev: routeVal('routeValues', 'showPrev'),
  actions: {

    /**
     * a central place to process requests for the next step
     * also holds a list of validation steps for each step in the process
     */
    next: function () {
      var currentRoute = Ember.get(this, 'currentPath');
      var self = this;

      if (currentRoute === 'client.registrations.add.step1') {
        if (Ember.isEmpty(this.get('registration.camper'))) {
          this.get('notify').alert('Must select a camper before proceeding.');
          return;
        }
      }

      // verify data coming out of step2 works
      if (currentRoute === 'client.registrations.add.step2') {
        if (this.get('registration.requests').length === 0) {
          this.get('notify').alert('Must include at least on request before proceeding');
          return;
        }

        // verify that each request is fully completed
        var requests = this.get('registration.requests');
        var proceed = true;
        requests.forEach(function (item) {
          if (Ember.isEmpty(item.get('priority'))) {
            self.get('notify').alert('Each request must have a valid priority');
            proceed = false;
          }

          if (Ember.isEmpty(item.get('event'))) {
            self.get('notify').alert('Each request must have a selected Program/Cabin selected.');
            proceed = false;
          }
        });

        //use this to exit processing the action if validation fails
        if (proceed === false) {
          return;
        }
      }

      this.transitionToRoute(this.get('nextTransition'));
    },
    prev: function () {
      this.transitionToRoute(this.get('prevTransition'));
    }
  }
});

