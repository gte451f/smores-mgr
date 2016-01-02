import Ember from 'ember';
import Error from 'smores-mgr/mixins/crud/error';
import ENV from 'smores-mgr/config/environment';

export default Ember.Controller.extend(Error, {
  breadCrumb: 'Fields',
  notify: Ember.inject.service(),
  session: Ember.inject.service(),
  isSpinning: false,

  currentGroup: 'registrations',

  // easy way to set default names to be unique
  fieldNameNum: 1,

  customGroups: [
    {display: 'Registrations', value: 'registrations'},
    {display: 'Accounts', value: 'accounts'},
    {display: 'Attendees', value: 'attendees'},
    {display: 'Owners', value: 'owners'}
  ],
  fieldTypes: [
    {display: 'Text', value: 'text'},
    {display: 'Text Area', value: 'textarea'},
    {display: 'List Box', value: 'select'},
    {display: 'Single Check Box', value: 'single-check'},
    {display: 'Multi Check Box', value: 'multi-check'},
    {display: 'Radio Button', value: 'radio'},
    {display: 'Date', value: 'date'}
  ],

  fieldData: [
    {display: 'Text', value: 'string'},
    {display: 'Numbers', value: 'number'}
  ],

  currentFields: [],

  currentGroupChanged: Ember.observer('currentGroup', 'model', function () {
    var currentGroup = this.get('currentGroup');
    var model = this.get('model');
    this.set('currentFields', model.filterBy('table', currentGroup));
  }),

  actions: {
    /**
     * save a batch of new/edit fields
     */
    saveGroup: function () {
      this.set('isSpinning', true);
      var self = this;
      var currentFields = this.get('currentFields');
      var saveList = [];
      var session = this.get('session.data.authenticated');

      currentFields.forEach(function (item) {
        // reset this value when text or text area is selected
        if (item.get('enableAllowedValues') === false) {
          item.set('possibleValues', '');
        }

        if (item.get('input') === 'date') {
          item.set('allowedData', 'utcdate');
        }
        if (item.get('input') === 'single-check') {
          item.set('allowedData', 'boolean');
        }

        if (item.get('hasDirtyAttributes')) {
          saveList.pushObject(item.save());
        }
      });

      Ember.RSVP.all(saveList).then(function () {
        if (saveList.length === 0) {
          self.get('notify').warning('No changes detected, nothing saved');
          self.set('isSpinning', false);
        } else {
          var that = self;
          Ember.$.ajax({
            url: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/fields/rebuild',
            type: 'POST',
            headers: {'X-Authorization': 'Token: ' + session.token},
            data: JSON.stringify({view: that.get('currentGroup')}),
            contentType: "application/json; charset=utf-8",
            dataType: "json"
          }).then(function (response) {
            that.get('notify').success('Fields for current group saved!');
            that.set('isSpinning', false);
          }, function (xhr, status, error) {
            self.get('notify').error('Fields were saved but an error occurred rebuilding the view');
            console.log(xhr.responseText);
          });
        }

      }, function (reason) {
        var len = reason.errors.length - 1;
        var description = reason.errors[len].detail;
        self.get('notify').error('An error occurred while saving this data: ' + description);
        self.set('isSpinning', false);
      });
    },

    addField: function () {
      let fieldNameNum = this.get('fieldNameNum');
      this.store.createRecord('field', {
        display: 'Default ' + fieldNameNum,
        table: this.get('currentGroup'),
        input: 'text',
        allowedData: 'string',
        private: 0
      });
      this.set('fieldNameNum', fieldNameNum + 1);
    },

    /**
     * rebuild the api view for the currentGroup
     */
    rebuildView: function () {
      var self = this;
      var session = this.get('session');

      Ember.$.ajax({
        url: ENV.APP.restDestination + '/' + ENV.APP.restNameSpace + '/fields/rebuild',
        type: 'POST',
        headers: {'X-Authorization': 'Token: ' + session.token},
        data: JSON.stringify({view: this.get('currentGroup')}),
        contentType: "application/json; charset=utf-8",
        dataType: "json"
      }).then(function (response) {
        self.get('notify').success('Rebuild view successful');
      }, function (xhr, status, error) {
        self.get('notify').error('An error occurred rebuilding the view');
        console.log(xhr.responseText);
      });

    }

  }
});
