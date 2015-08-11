import Ember from 'ember';

// basic model expect a model to be supplied
// handy for delete confirms and other unspecified uses
export default Ember.Component.extend({
    closeText: 'Close',
    okText: 'Ok',
    actions: {
        ok: function () {
            this.$('.modal').modal('hide');
            this.sendAction('ok', this.get('model'));
        }
    },
    show: Ember.on('didInsertElement', function () {
        this.$('.modal').modal().on('hidden.bs.modal', function () {
            this.sendAction('close');
        }.bind(this));
    }),
    // place holder for supplied mode
    model: false
});