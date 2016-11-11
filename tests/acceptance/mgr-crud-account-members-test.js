import { test } from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import { authenticateSession } from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import { userData } from '../util/auth-admin-user';

moduleForAcceptance('Acceptance | mgr crud account members');

test('visiting /mgr-crud-account-members', function (assert) {
  authenticateSession(this.application, userData);
  visit('/mgr/account/1/info');

  andThen(function () {
    assert.equal(currentURL(), '/mgr/account/1/info');
  });

  // test adding and deleting an attendee
  click('#add-attendee');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/attendees/add');
    fillIn("input[name='firstName']", 'Junior');
    fillIn("input[name='lastName']", 'Jones');
    fillIn("input[name='gender']", 'Male');
    fillIn("input[name='dob']", '2004-01-01');
    // fillIn("input[name='schoolGrade']", '7th');
    select('.school-grade', 'My Option');
    click('#save-new-attendee');
    andThen(() => assert.equal(currentURL(), '/mgr/account/1/info'));

    click('ul.attendee-list a:last');
    andThen(function () {
      // now let's remove the record and verify we land back on the account list page
      click('#delete-attendee');
      andThen(() => assert.equal(currentURL(), '/mgr/account/1/info'));
    });
  });

  // test adding and deleting an owner
  click('#add-owner');
  andThen(function () {
    assert.equal(currentURL(), '/mgr/owner/add');
    fillIn("input[name='firstName']", 'FIRST');
    fillIn("input[name='lastName']", 'LAST');
    fillIn("input[name='relationship']", 'Mother');
    fillIn("input[name='gender']", 'Male');
    fillIn("input[name='email']", 'foobar@foobar.com');
    fillIn("input[name='number']", '789-789-7890');
    fillIn("input[name='phoneType']", 'Office');
    click('#save-new-owner');
    andThen(() => assert.equal(currentURL(), '/mgr/account/1/info'));

    //edit new record
    click('ul.attendee-list a:last');
    andThen(function () {
      // now let's remove the record and verify we land back on the account list page
      click('#delete-attendee');
      andThen(() => assert.equal(currentURL(), '/mgr/account/1/info'));
    });
  });


});
