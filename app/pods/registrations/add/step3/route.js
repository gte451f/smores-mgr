import Ember from 'ember';

export default Ember.Route.extend({

    activate: function () {
        var add = this.controllerFor('registrations.add');
        var wizardToken = add.get('wizardToken');
        if (wizardToken === 'start') {
            this.transitionTo('registrations.add.step1');
        } else {
            add.set('wizardToken', 'step3');
        }
        return true;
    }
});
