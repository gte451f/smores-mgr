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

    // test ownership
    click('#add-owner');
    andThen(function () {
      assert.equal(currentURL(), '/client/members/add-owner');
      fillIn("input[name='firstName']", 'FIRST');
      fillIn("input[name='lastName']", 'LAST');
      fillIn("input[name='relationship']", 'Mother');
      fillIn("input[name='gender']", 'Male');
      fillIn("input[name='email']", 'foobar@foobar.com');
      fillIn("input[name='number']", '789-789-7890');
      fillIn("input[name='phoneType']", 'Office');
      click('#save-new-owner');
      andThen(() => assert.equal(currentURL(), '/client/members/list'));

      //edit new record
      click('div.parent-list .list-group-item:last');
      andThen(function () {
        assert.equal(find('div.owner-box div h3').text(), 'Edit Owner Information');
        fillIn("input[name='lastName']", 'LAST2');
        fillIn("input[name='firstName']", 'FIRST2');
        click('#save-edit-owner');
        andThen(function () {
          // now let's remove the record and verify we land back on the member list page
          click('#delete-owner');
          andThen(() => assert.equal(currentURL(), '/client/members/list'));
        });
      });
    });


    // test attendees
    click('#add-attendee');
    andThen(function () {
      assert.equal(currentURL(), '/client/members/add-attendee');
      fillIn("input[name='firstName']", 'Junior');
      fillIn("input[name='lastName']", 'Jones');
      fillIn("input[name='gender']", 'Male');
      fillIn("input[name='dob']", '2004-01-01');
      // fillIn("input[name='schoolGrade']", '7th');
      select('.school-grade', 'My Option');
      click('#save-new-attendee');
      andThen(() => assert.equal(currentURL(), '/client/members/list'));

      //edit new record
      click('div.attendee-list .list-group-item:last');
      andThen(function () {
        assert.equal(find('div.attendee-box div h3').text(), 'Edit Camper Information');
        fillIn("input[name='lastName']", 'Junior1');
        fillIn("input[name='firstName']", 'Jones2');
        click('#save-edit-attendee');
        andThen(function () {
          // now let's remove the record and verify we land back on the member list page
          click('div.attendee-list .list-group-item:last');
          andThen(function () {
            click('#delete-attendee');
          });
          andThen(() => assert.equal(currentURL(), '/client/members/list'));
        });
      });
    });


  });


});
