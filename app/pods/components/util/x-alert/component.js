import Ember from 'ember';

/**
 * make it easier to render an alert complete with toggle to hide
 */
export default Ember.Component.extend({
  // classNames: ['alert', 'alert-danger', 'alert-dismissible']
  classNameBindings: ['alertStyleClasses'],
  alertStyle: 'danger',
  alertStyleClasses: Ember.computed('alertStyle', function () {
    let styleString = this.get('alertStyle');
    styleString = 'alert alert-' + styleString + ' ' + styleString + '-dismissible';
    return styleString;
  })
});
