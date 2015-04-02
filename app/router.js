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
    this.route('accounts', function () {
        this.route("account", {
            path: "/account/:account_id"
        });
    });
    this.route('attendees');
    this.route('setup', function () {
        this.route('locations', function () {
            this.route('edit');
            this.route('info');
        });
        this.route('programs', function() {
          this.route('info');
          this.route('edit');
        });
        this.route('events');
    });
    this.route('dash');
    this.route('reports');
});

export default Router;
