import AutoComplete from "ember-cli-auto-complete/components/auto-complete";

export default AutoComplete.extend({
    // this seems to act as the "label" of the autosuggest despite what the docs say
    valueProperty: "fullName",

    // suggestions monitors this value instead of inputVal directly
    triggerSuggestions: 0,

    // return a filtered list of potential options based on user input
    suggestions: function () {
        console.log('suggestions triggered');
        return this.get("options");
    }.property('triggerSuggestions'),

    // notify controller that inputVal has changed and the options array should be refreshed
    updateOptions: function () {
        console.log('updateOptions triggered');
        var inputVal = this.get('inputVal');
        this.sendAction('action', inputVal);
    }.observes('inputVal'),

    // called when the user selects from among suggestions
    // validate the selection
    optionsToMatch: function () {
        console.log('optionsToMatch triggered');
        var caseInsensitiveOptions = [];
        this.get("options").forEach(function (item) {
            var value = item.get("id");
            caseInsensitiveOptions.push(value);
            caseInsensitiveOptions.push(value.toLowerCase());
        });
        return caseInsensitiveOptions;
    }.property("options.@each")
});