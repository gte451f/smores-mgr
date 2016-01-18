import Ember from 'ember';

export default Ember.Controller.extend({
  breadCrumb: 'Edit Owner',
  newPhone: false,

  actions: {
    toggleNewPhone: function () {
      this.set('newPhone', true);
    }
  }
});
