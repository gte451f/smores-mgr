import Ember from 'ember';
import AccountsControllerMixin from '../../../mixins/accounts/controller';
import { module, test } from 'qunit';

module('Unit | Mixin | accounts/controller');

// Replace this with your real tests.
test('it works', function(assert) {
  var AccountsControllerObject = Ember.Object.extend(AccountsControllerMixin);
  var subject = AccountsControllerObject.create();
  assert.ok(subject);
});
