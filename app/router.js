import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function () {
  /**
   * start administrative routes here
   */
  this.route('mgr', function () {
    this.route('auth', function () {
      this.route('login');
      this.route('reminder');
      this.route('activate');
      this.route('reset');
    });

    this.route('dash');
    this.route('reports');
    this.route('test');

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

    this.route('setup', function () {
      this.route('settings');
      this.route('fields');
      this.route('dash');

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
      this.route("edit");
      this.route("payments",
        function () {
          this.route('info');
          this.route('add-charge');
          this.route('add-payment');
        });

      this.route("registrations");
      this.route('cards',
        function () {
          this.route('add');
        });
    });

    this.route('owner', {path: "owner/:owner_id"}, function () {
      this.route("info");
      this.route("edit");
    });

    this.route('accounts', function () {
      this.route('list');
    });
  });

  /**
   * start client routes here
   */
  this.route('client', function () {
    this.route('auth', function () {
      this.route('login');
      this.route('reminder');
      this.route('reset');
      this.route('new');
      this.route('activate');
    });

    this.route('me');
    this.route('dash');
    this.route('test');

    this.route('member', function () {
      this.route('list');
    });

    this.route('registrations', function () {
      this.route('add', function () {
        this.route('step1');
        this.route('step2');
        this.route('step3');
      });
      this.route('list');
      this.route('info', {path: "/info/:registration_id"});
    });

    this.route('members', function () {
      this.route('list');
      this.route('add-attendee');
      this.route('add-owner');
      this.route('edit-owner', {path: "/edit-owner/:owner_id"});
      this.route('edit-attendee', {path: "/edit-attendee/:attendee_id"});
    });

    this.route('billing', function () {
      this.route('summary');
      this.route('add-payment');
      this.route('cards', function () {
        this.route('add');
        this.route('list');
      });
    });
  });
  this.route('switchboard');
});

export default Router;
