import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-demo-user';

moduleForAcceptance('Acceptance | client browse account members');

test('visiting client -> account members page', function (assert) {
  authenticateSession(this.application, userData);
  visit('/client/members/list');

  andThen(function () {
    assert.equal(currentURL(), '/client/members/list');
    assert.equal(find('h1').text(), 'Account Members');

    click('#add-owner');
    andThen(() => assert.equal(find('h3.box-title').text(), 'Add New Owner'));
    click('#cancel-new-owner');

    click('#add-attendee');
    andThen(() => assert.equal(find('h3.box-title').text(), 'Add New Camper'));
    click('#cancel-new-attendee');


    // let's edit a record
    click('div.attendee-list .list-group-item');
    click('#cancel-edit-attendee');

    // let's edit a record
    click('div.parent-list .list-group-item');
    // add a new phone record
    click('#new-phone');
    // and cancel
    click('#cancel-new-phone');
    // and cancel editing an owner
    click('#cancel-edit-owner');
  });
});
