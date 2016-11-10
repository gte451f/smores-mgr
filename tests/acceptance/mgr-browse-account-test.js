import { test } from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import { authenticateSession } from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import { userData } from '../util/auth-admin-user';

moduleForAcceptance('Acceptance | mgr browse account');

test('visiting /mgr-browse-account', function (assert) {
  authenticateSession(this.application, userData);
  visit('/mgr/account/1/info');

  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/info');
  });

  click('#edit-account');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/edit');
    fillIn("textarea[name='notes']", 'update notes 11');
  });

  click('#save-account');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/info');
  });

  visit('/mgr/account/1/registrations');

  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/registrations');
  });

});
