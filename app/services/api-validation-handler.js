import Ember from 'ember';

export default Ember.Service.extend({
  notify: Ember.inject.service(),

  /**
   * common way to handle all validation messages returned by the API
   * @param data
   */
  handleValidationResponse: function (response) {
    // build a list of validation messages
    let errorMessage = '<h5>Errors prevented this request from completing:</h5>';

    response.errors.forEach(function (item) {
      errorMessage = errorMessage + '<li>' + item.detail + '</li>';
    });

    errorMessage = '<ul>' + errorMessage + '</ul>';
    // notify the user of the error
    this.get('notify').alert({html: errorMessage});
  }

});
