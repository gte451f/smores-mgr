import Ember from 'ember';
import AutoComplete from 'ember-cli-auto-complete/components/auto-complete';
// import layout from '../templates/components/x-autosuggest';
const { computed } = Ember;

export default AutoComplete.extend({
  // layout: layout,

  // this seems to act as the "label" of the autosuggest despite what the docs say
  valueProperty: "name",

  // return a filtered list of potential options based on user input
  // basically return all options since the remote api already did the filtering
  suggestions: computed.alias('options'),

  // notify controller that inputVal has changed and the options array should be refreshed
  updateOptions: Ember.observer('inputVal', function () {
    var inputVal = this.get('inputVal');
    this.sendAction('action', inputVal);
  }),

  // called when the user selects from among suggestions
  // validate the selection
  optionsToMatch: Ember.computed("options.[]", function () {
    var caseInsensitiveOptions = [];
    this.get("options").forEach(function (item) {
      var value = item.get("id");
      caseInsensitiveOptions.push(value);
      caseInsensitiveOptions.push(value.toLowerCase());
    });
    return caseInsensitiveOptions;
  })
});

