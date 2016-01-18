import Ember from 'ember';

export default Ember.Controller.extend({

    letsGo: true,
    actions: {
        letsGo: function (toggle) {
            console.log('let us depart');
            this.set('letsGo', toggle);
        }
    }

});
