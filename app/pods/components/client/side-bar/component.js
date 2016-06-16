import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'aside',
  classNames: ['main-sidebar'],
  menuItems: [
    'nav-test',
    'nav-media',
    'nav-email'
  ],

  actions: {
    toggleMenu: function (element) {
      var menuItems = this.get('menuItems');
      var elm = '#' + element;
      Ember.$(elm).toggleClass('active');

      menuItems.forEach(function (item) {
        // reset all other menu items to off position
        if (item !== element) {
          elm = '#' + item;
          Ember.$(elm).removeClass('active');
        }
      });
    }
  }
});
