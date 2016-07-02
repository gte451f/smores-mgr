import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | login');

test('user can login & out with 2 fake accounts', function (assert) {
  visit('/client/auth/login');
  // visit site and verify sign in putton
  andThen(function () {
    assert.equal(currentURL(), '/client/auth/login');
    assert.equal(find(':submit').text(), 'Sign In');
  });

  // login as demo
  fillIn('#identification', 'demo@smores.camp');
  fillIn('#password', 'password1234');
  click(':submit');
  andThen(() => assert.equal(find('#logout').text(), 'Logout'));

  //verify logout works
  click('#logout');
  andThen(() => assert.equal(find(':submit').text(), 'Sign In'));


  // try again as admin
  fillIn('#identification', 'admin@smores.camp');
  fillIn('#password', 'password1234');
  click(':submit');
  andThen(() => assert.equal(find('#logout').text(), ''));
});
