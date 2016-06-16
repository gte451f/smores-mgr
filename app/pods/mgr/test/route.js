import Ember from 'ember';

export default Ember.Route.extend({
  model: function () {
    return this.store.findAll('location');
  },

  setupController: function (controller, resolved) {
    var model = {
      colors: ['blue', 'green', 'yellow', 'clear'],
      locations: resolved,
      currentLocation: null,
      currentColor: 'clear'
    };
    this._super(controller, model);
  },
});
