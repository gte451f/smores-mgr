import Ember from 'ember';

export default Ember.Service.extend({
  notify: Ember.inject.service(),

  /**
   * common way to handle all validation messages returned by the API
   * @param data
   */
  handleValidationResponse: function (errors) {
    // build a list of validation messages
    let errorMessage = '<h5>Validation errors prevented this request from completing:</h5>';

    errors.forEach(function (item) {
      errorMessage = errorMessage + '<li>' + item.detail + '</li>';
    });

    errorMessage = '<ul>' + errorMessage + '</ul>';
    // notify the user of the error
    this.get('notify').alert({html: errorMessage});
  },

  /**
   * common way to handle locally detected validation messages from the validation object on the model
   * @param messages
   */
  handleLocalErrors(messages){
    // build a list of validation messages
    let errorMessage = '<h5>Validation errors prevented this request from completing:</h5>';

    messages.forEach(function (item) {
      errorMessage = errorMessage + '<li>' + item + '</li>';
    });

    errorMessage = '<ul>' + errorMessage + '</ul>';
    // notify the user of the error
    this.get('notify').alert({html: errorMessage});
  }

});
