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
  });
  this.route('test');

  this.route('auth', function() {
    this.route('login');
  });
});

export default Router;
