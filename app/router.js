import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
    location: config.locationType
});

Router.map(function () {
    this.route('user-mgr', function () {
        this.route('user', {
            path: 'user-mgr/:user_id'
        });
        this.route('profile');
    });
    this.route('test');

    this.route('auth', function () {
        this.route('login');
        this.route('signup');
        this.route('reminder');
        this.route('profile');
    });
    this.route('registrations', function () {
        this.route('add');
        this.route('edit');
    });
    this.route('registration', {"path": "registration/:registration_id"});

    this.route('accounts', function () {
        this.route("account", {
            path: "/account/:account_id"
        });
    });
    this.route('attendees');
    this.route('attendee', {"path": "attendees/:attendee_id"});
    this.route('owner', {"path": "owner/:owner_id"});

    this.route('setup', function () {
        this.route('locations', function () {
            this.route('edit', {"path": "setup/locations/edit/:location_id"});
            this.route('info', {"path": "setup/locations/info/:location_id"});
        });
        this.route('programs', function () {
            this.route('edit', {"path": "setup/programs/edit/:program_id"});
            this.route('info', {"path": "setup/programs/info/:program_id"});
        });
        this.route('events');
    });
    this.route('dash');
    this.route('reports');

    this.route('locations');

});

export default Router;
