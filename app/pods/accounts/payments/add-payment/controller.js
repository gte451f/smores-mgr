import Ember from 'ember';


/**
 * lots of custom work to control the pages toggle rules
 */
export default Ember.Controller.extend({
    mode: 'Cash',
    isCash: true,
    isCheck: false,
    isCredit: false,

    // toggle check section
    // true means to enable or make this the active payment option
    toggleCheck: function (status) {
        var disabled = !status;
        Ember.$('#checkDate').prop("disabled", disabled);
        Ember.$('#checkDate').val("");
        Ember.$('#checkNumber').prop("disabled", disabled);
        Ember.$('#checkNumber').val("");
        this.set('isCheck', status);
        // toggle class
        if (status === true) {
            Ember.$('#check-panel').removeClass("panel-default");
            Ember.$('#check-panel').addClass("panel-success");
        } else {
            Ember.$('#check-panel').removeClass("panel-success");
            Ember.$('#check-panel').addClass("panel-default");
        }

    },

    // toggle credit section
    toggleCredit: function (status) {
        var disabled = !status;
        Ember.$('#cardOnFile').prop("disabled", disabled);
        Ember.$('#cardOnFile').val("");
        this.set('isCredit', status);

        // toggle class
        if (status === true) {
            Ember.$('#credit-panel').removeClass("panel-default");
            Ember.$('#credit-panel').addClass("panel-success");
        } else {
            Ember.$('#credit-panel').removeClass("panel-success");
            Ember.$('#credit-panel').addClass("panel-default");
        }
    },

    // toggle cash section
    toggleCash: function (status) {
        this.set('isCash', status);

        // toggle class
        if (status === true) {
            Ember.$('#cash-panel').removeClass("panel-default");
            Ember.$('#cash-panel').addClass("panel-success");
        } else {
            Ember.$('#cash-panel').removeClass("panel-success");
            Ember.$('#cash-panel').addClass("panel-default");
        }
    },

    actions: {
        activateCredit: function () {
            this.set('mode', 'Credit');
            this.toggleCredit(true);
            this.toggleCheck(false);
            this.toggleCash(false);
        },
        activateCheck: function () {
            this.set('mode', 'Check');
            this.toggleCredit(false);
            this.toggleCheck(true);
            this.toggleCash(false);
        },
        activateCash: function () {
            this.set('mode', 'Cash');
            this.toggleCash(true);
            this.toggleCredit(false);
            this.toggleCheck(false);
        }

    }
});
