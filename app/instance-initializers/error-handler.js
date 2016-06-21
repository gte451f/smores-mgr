import Ember from 'ember';

/**
 * insert logic to handle errors globally
 * primary focus is to create hook where API errors can be dealt with in a consistent way
 * @param appInstance
 */
export function initialize(appInstance) {
  var notify = appInstance.lookup('service:notify');

  // extra space in case a lot of error handling is needed
  // var errorHelper = appInstance.lookup('service:error-helper');

  /**
   * Global error handler for promises that return a 500
   * expected rejections like validation errors are handled in the route
   *
   * Deal with either an expected JSON API formatted array of error objects
   * or some sort of internal error with a simple err.message
   */
  Ember.RSVP.on('error', function(err) {
    // print out api errors
    if (!Ember.isEmpty(err.errors) && Ember.isArray(err.errors)) {
      err.errors.forEach((error) => {
        notify.alert({html: "The API Returned an unexpected error! <br /> " + error.title + "<br />  Error #" + error.id});
      });
    } else {
      // handle internal error
      notify.alert("An internal error occurred! " + err.message);
    }
  });
}

export default {
  name: 'error-handler',
  initialize
};
