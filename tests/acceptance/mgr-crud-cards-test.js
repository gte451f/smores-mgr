import { test } from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-admin-user';

moduleForAcceptance('Acceptance | mgr crud cards');

test('visiting /mgr-crud-cards', function(assert) {
  authenticateSession(this.application, userData);
  visit('/mgr/account/1/cards');

  andThen(function () {
    //1
    assert.equal(currentURL(), '/mgr/account/1/cards');

    //let's add a card
    click('#add-card');
    andThen(function () {
      //2
      assert.equal(currentURL(), '/mgr/account/1/cards/add');
      fillIn("input[name='nameOnCard']", 'SOME NAME');
      selectChoose('.expirationMonth', 'November');
      selectChoose('.expirationYear', 2019);
      fillIn("input[name='number']", '4242424242424242');
      fillIn("input[name='cvc']", '784');
      selectChoose('.vendor', 'Visa');
      fillIn("input[name='isDebit']", true);
      fillIn("input[name='allowReoccuring']", true);
      click('#save-new-card');
      //3
      andThen(() => assert.equal(currentURL(), '/mgr/account/1/cards'));

      click('button.delete-card:last');
      andThen(function () {
        // now let's remove the record and verify we land back on the member list page
        // verify modal appeared
        // 4
        assert.equal(find('.modal-dialog .modal-content .modal-header h4:first').text(), 'Confirm: Delete Credit Card');
        click('.confirm-delete');
        // 5
        andThen(() => assert.equal(currentURL(), '/mgr/account/1/cards'));
      });
    });
  });
});
