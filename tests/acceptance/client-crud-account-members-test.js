import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-demo-user';

moduleForAcceptance('Acceptance | client crud account members');

test('visiting client -> CRUD on account members page', function (assert) {
  authenticateSession(this.application, userData);
  visit('/client/members/list');

  andThen(function () {
    assert.equal(currentURL(), '/client/members/list');

    click('#add-owner');
    fillIn("input[name='firstName']", 'FIRST');
    fillIn("input[name='lastName']", 'LAST');
    fillIn("input[name='relationship']", 'Mother');
    fillIn("input[name='gender']", 'Male');
    fillIn("input[name='email']", 'foobar@foobar.com');
    fillIn("input[name='number']", '789-789-7890');
    fillIn("input[name='phoneType']", 'Office');
    click('#save-new-owner');

    // let's edit a record
    let newRecordLink = find('div.parent-list .list-group-item').last();
    click(newRecordLink);

    // now let's remove the record
    // click('#delete-owner');

  });
});
