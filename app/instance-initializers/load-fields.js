import Ember from 'ember';
import DS from 'ember-data';

import Owner from 'smores-mgr/models/owner';


export function initialize(applicationInstance) {
  //var customFields = applicationInstance.registry.lookup('service:custom-fields');
  var customFields = Ember.Object.create({
    allFields: [],
    registrationFields: [],
    accountFields: []
  });

  // var container = applicationInstance.lookup ? applicationInstance : applicationInstance.container;
  // var store = container.lookup('service:store');
  // var model = applicationInstance.container.lookup('model:owner');
  // debugger;
  Owner.reopen({
    foobar: DS.attr('string')
  });

  // store.findAll('field').then(function (fields) {
  //   customFields.set('allFields', fields);
  //
  //   let groupList = [
  //     {model: 'registration', table: 'registrations'},
  //     {model: 'account', table: 'accounts'},
  //     {model: 'owner', table: 'owners'},
  //     {model: 'attendee', table: 'attendees'}
  //   ];
  //
  //   groupList.forEach(function (item) {
  //     // var model = applicationInstance.registry.lookupFactory('model:' + item.model);
  //     var model = container.lookup('model:' + item.model);
  //
  //     var fieldList = [];
  //     var attrs = {};
  //     fields.forEach(function (field) {
  //       if (field.get('table') === item.table) {
  //         fieldList.pushObject(field);
  //         attrs[field.get('name').camelize()] = DS.attr(field.get('allowedData'));
  //       }
  //     });
  //
  //     customFields.set(item.model + 'Fields', fieldList);
  //     model.reopen(attrs);
  //   });
  // });

  applicationInstance.register('service:custom-fields', customFields);
  // applicationInstance.inject('route', 'foobar', 'foobar:main');
}

export default {
  name: 'load-fields',
  initialize: initialize
};
