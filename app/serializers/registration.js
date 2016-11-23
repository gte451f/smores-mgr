import JSONAPISerializer from 'ember-data/serializers/json-api';
import Ember from 'ember';

export default JSONAPISerializer.extend({

  //force a relationship between accounts and registrations
  // use the api hasManyToMany and map it to a more traditional belongsTo
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {

    if (Object.prototype.toString.call(payload.data) === '[object Array]') {
      payload.data.forEach(function (registration) {
        if (!Ember.isEmpty(registration.relationships.accounts)) {
          registration.relationships.account = {
            data: {
              id: registration.relationships.accounts.data[0].id,
              type: 'accounts'
            }
          };
          delete registration.relationships.accounts;
        }
      });
    } else {
      // process single result record but only if an accounts relationship is defined
      if (!Ember.isEmpty(payload.data.relationships) && !Ember.isEmpty(payload.data.relationships.accounts)) {
        payload.data.relationships.account = {
          data: {
            id: payload.data.relationships.accounts.data[0].id,
            type: 'accounts'
          }
        };
        delete payload.data.relationships.accounts;
      }
    }

    return this._super(...arguments);
  }
});
