import Ember from 'ember';
import Base from 'ember-simple-auth/authorizers/base';

export default Base.extend({
  authorize(sessionData, block) {
    if (!Ember.isEmpty(sessionData.data.attributes.token)) {
      block('X-Authorization', 'Token: ' + sessionData.data.attributes.token);
    }
  }
});
