import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-admin-user';

moduleForAcceptance('Acceptance | mgr crud account billing');

test('visiting /mgr-crud-account-billing', function (assert) {
  authenticateSession(this.application, userData);
  visit('/mgr/account/1/payments/info');

  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/payments/info');
  });

  click('#add-payment');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/payments/add-payment');
    fillIn("input[name='amount']", '12');
  });

  click('#save-new-payment');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/payments/info');
  });

  click('button.delete-payment:last');
  andThen(function () {
    assert.equal(find('.modal-dialog .modal-content .modal-header h4:first').text(), 'Confirm: Delete Payment');
    click('.confirm-delete');
    andThen(() => assert.equal(currentURL(), '/mgr/account/1/payments/info'));
  });
});
