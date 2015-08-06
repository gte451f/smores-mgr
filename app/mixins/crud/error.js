import Ember from 'ember';
import Notify from 'ember-notify';

/**
 * a basic helper mixin that provides common logic when handling errors generated from the API
 */
export default Ember.Mixin.create({

    /**
     * intended to handle errors that come back from API calls
     * @param reason
     */
    handleXHR: function (reason) {
        // display a list of validation errors
        if (reason.responseJSON) {
            var errorHTML = '<strong>' + reason.responseJSON.records.userMessage + '</strong> <br/>';
            reason.responseJSON.records.validationList.forEach(function (item) {
                errorHTML = errorHTML + item.message + '<br/>';
            }, this);
            Notify.alert({raw: errorHTML});
            return;
        }

        if (reason.message) {
            Notify.alert(reason.message);
            return;
        }
        // if nothing goes as expected...
        if (reason.responseText) {
            Notify.alert(reason.responseText);
            return;
        }
    },
    test: function () {
        Notify.alert('test');
    }
});