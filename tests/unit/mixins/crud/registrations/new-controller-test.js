import Ember from 'ember';
import CrudRegistrationsNewControllerMixin from 'smores-mgr/mixins/crud/registrations/new-controller';
import { module, test } from 'qunit';

module('Unit | Mixin | crud/registrations/new controller');

// Replace this with your real tests.
test('it works', function(assert) {
  let CrudRegistrationsNewControllerObject = Ember.Object.extend(CrudRegistrationsNewControllerMixin);
  let subject = CrudRegistrationsNewControllerObject.create();
  assert.ok(subject);
});
