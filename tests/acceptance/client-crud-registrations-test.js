import {test} from 'qunit';
import moduleForAcceptance from 'smores-mgr/tests/helpers/module-for-acceptance';

// tests/acceptance/…
import {authenticateSession} from 'smores-mgr/tests/helpers/ember-simple-auth';
// custom helpers here
import {userData} from '../util/auth-demo-user';


moduleForAcceptance('Acceptance | client crud registrations');

test('visiting client -> CRUD on account registration page', function (assert) {
  authenticateSession(this.application, userData);
  visit('/client/registrations/list');

  andThen(function () {
    assert.equal(currentURL(), '/client/registrations/list');
    // test ownership
    click('#add-registration');
    andThen(function () {
      assert.equal(currentURL(), '/client/registrations/new');

      selectChoose('.registrationAttendee', 'Camper Attendee');
      fillIn("textarea[name='registrationNote']", 'Test Notes 1');
      click('.btn-next');
      andThen(function () {
        selectChoose('.registrationLocations', 'Camp Greystone');
        selectChoose('.registrationSessions', 'Session #1');
        selectChoose('.registrationEvents', 'Sports Camp - Bullpups');

        click('.btn-next');
        andThen(function () {
          click('#save-registration');
          andThen(function () {
            assert.equal(find('#attendee-name').text(), 'Attendee, Camper');
          });
        });
      });
    });
  });
});
