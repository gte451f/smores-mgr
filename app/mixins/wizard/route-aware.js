import Ember from 'ember';

export default Ember.Mixin.create({
  needs: ['application'],
  currentPath: Ember.computed.alias("controllers.application.currentPath")
});
