import Ember from 'ember';
import AccountsRouteMixin from '../../../mixins/accounts/route';
import { module, test } from 'qunit';

module('Unit | Mixin | accounts/route');

// Replace this with your real tests.
test('it works', function(assert) {
  var AccountsRouteObject = Ember.Object.extend(AccountsRouteMixin);
  var subject = AccountsRouteObject.create();
  assert.ok(subject);
});
