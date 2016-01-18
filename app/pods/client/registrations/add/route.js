import Ember from 'ember';

export default Ember.Route.extend({
    actions: {
        hideHelp: function () {
            console.log('showhelp');
            Ember.$('#helpBox').addClass("hidden");
        }
    }
});
