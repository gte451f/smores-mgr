import { test } from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
//import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
//import {userData} from '../util/auth-demo-user';

moduleForAcceptance('Acceptance | create new account');

test('visiting client -> account members page', function (assert) {
  //authenticateSession(this.application, userData);
  visit('/client/auth/new');

  andThen(function () {
    assert.equal(currentURL(), '/client/auth/new');
    fillIn("input[name='password']", 'password1234');
    fillIn("input[name='confirm']", 'password1234');
    fillIn("input[name='first_name']", 'Bobby');
    fillIn("input[name='last_name']", 'Jones');
    fillIn("input[name='gender']", 'Male');
    click('#save-new-account');
    //andThen(() => assert.equal(currentURL(), '/client/members/list'));
  });
});
