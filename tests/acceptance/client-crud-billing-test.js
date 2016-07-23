import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-demo-user';

moduleForAcceptance('Acceptance | client crud billing');

test('visiting /client-crud-billing', function (assert) {
  authenticateSession(this.application, userData);
  visit('/client/billing/cards/list');

  andThen(function () {
    assert.equal(currentURL(), '/client/billing/cards/list');

    //let's add a card
    click('#add-card');
    andThen(function () {
      assert.equal(currentURL(), '/client/billing/cards/add');
      fillIn("input[name='nameOnCard']", 'SOME NAME');
      selectChoose('.expirationMonth', 'November');
      selectChoose('.expirationYear', 2019);
      fillIn("input[name='number']", '4242424242424242');
      fillIn("input[name='cvc']", '784');
      selectChoose('.vendor', 'Visa');
      fillIn("input[name='isDebit']", true);
      fillIn("input[name='allowReoccuring']", true);
      click('#save-new-card');
      andThen(() => assert.equal(currentURL(), '/client/billing/cards/list'));

      click('button.delete-card:last');
      andThen(function () {
        // now let's remove the record and verify we land back on the member list page
        // verify modal appeared
        assert.equal(find('.modal-dialog .modal-content .modal-header h4:first').text(), 'Confirm: Delete Credit Card');
        click('.confirm-delete-card');
        andThen(() => assert.equal(currentURL(), '/client/billing/cards/list'));
      });

    });
  });
});
