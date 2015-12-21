import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  this.route('test');

  this.route('auth', function () {
    this.route('login');
    this.route('signup');
    this.route('reminder');
    this.route('profile');
    this.route('logout');
    this.route('activate');
    this.route('reset');
  });

  this.route('registrations', function () {
    this.route('add', function () {
      this.route('step1');
      this.route('step2');
      this.route('step3');
    });
    this.route('edit', {"path": "edit/:registration_id"});
    this.route('list');
    this.route('info', {"path": "info/:registration_id"});
  });

  this.route('registration', {"path": "registration/:registration_id"});

  this.route('attendees', function () {
    this.route('list');
    this.route('info', {"path": "info/:attendee_id"});
    this.route('edit', {"path": "edit/:attendee_id"});
  });

  this.route('owner', {"path": "owner/:owner_id"});

  this.route('setup');
  this.route('fees', function () {
    this.route('info', {"path": "info/:fee_id"});
    this.route('edit', {"path": "edit/:fee_id"});
    this.route('add');
  });

  this.route('locations', function () {
    this.route('add');
    this.route('edit', {"path": "edit/:location_id"});
    this.route('info', {"path": "info/:location_id"});
  });
  this.route('programs', function () {
    this.route('add');
    this.route('edit', {"path": "edit/:program_id"});
    this.route('info', {"path": "info/:program_id"});
  });
  this.route('events', function () {
    this.route('list');
    this.route('edit', {"path": "edit/:event_id"});
    this.route('info', {"path": "info/:event_id"});
    this.route('add');
  });

  this.route('dash');
  this.route('reports');

  this.route('cabins', function () {
    this.route('add');
    this.route('edit', {"path": "edit/:cabin_id"});
  });
  this.route('sessions', function () {
    this.route('add');
    this.route('edit', {"path": "edit/:session_id"});
  });
  this.route('users', function () {
    this.route('add');
    this.route('edit', {"path": "edit/:employee_id"});
    this.route('info', {"path": "info/:employee_id"});
  });
  this.route('billing', function () {
    this.route('dash');
    this.route('batch', function () {
      this.route('info', {"path": "info/:payment_batch_id"});
      this.route('add');
    });
  });

  this.route('account', {path: "account/:account_id"}, function () {
    this.route("info");
    this.route("payments",
      function () {
        this.route('info');
        this.route('add-charge');
        this.route('add-payment');
      });

    this.route("registrations");
    this.route('cards',
      function () {
        this.route('edit', {"path": "edit/:card_id"});
        this.route('add');
      });

  });

  this.route('accounts', function () {
    this.route('list');
  });
});

export default Router;
