import Ember from 'ember';

export default Ember.Route.extend({
    // store a marker for session type persistence across wizard steps
    wizardToken: 'start',
    model(params) {
        return {foo: 2};
    },

    actions: {
        hideHelp: function () {
            console.log('showhelp');
            Ember.$('#helpBox').addClass("hidden");
        }
    }
});
