import Ember from 'ember';
import Notify from 'ember-notify';

/**
 * a basic helper mixin that provides common logic when handling errors generated from the API
 */
export default Ember.Mixin.create({

  title: null,
  detail: null,
  meta: null,
  validationList: [],

  /**
   * the error handling api has shifted before
   * this function will pull error related data from a given model and EXTRA normalize it for our api
   * so the rest of the mixin can pull the data it needs for display
   * @param model
   */
    loadError(model){
    var errors = model.get('errors');
    var self = this;
    // here is a direct way to access the title.message
    // var title = model.get('errors.title')[0].message;

    // list of validation messages if any
    var validationList = [];

    // loop since we want to pull any potential validation messages anyway
    errors.forEach(function (item) {
      switch (item.attribute) {
        case 'title':
          self.set('title', item.message);
          break;
        case 'detail':
          self.set('detail', item.message);
          break;
        case 'meta':
          self.set('meta', item.message);
          break;
        case 'code':
          self.set('code', item.message);
          break;
        case 'status':
          self.set('status', item.message);
          break;
        default:
          // load into validation list
          validationList.pushObject(item);
      }
    });

    this.set('validationList', validationList);
  },

  /**
   * stripped down to only report basic error messages
   * @param reason
   */
  handleXHR: function (reason) {
    var errors = reason.responseJSON.errors;
    var errorHTML = 'Error #' + errors.code + ' - ' + errors.title;

    if (!Ember.isEmpty(errors.detail)) {
      errorHTML = errorHTML + '<p>' + errors.detail + '</p>';
    }

    Notify.alert({raw: errorHTML});
  },

  /**
   * only report a toaster with title and detail
   * relies of private properties so there is no expectation that this logic will age well
   */
    simpleReport(model) {
    this.loadError(model);
    var errorHTML = '<h5>' + this.get('title') + '</h5>';

    if (!Ember.isEmpty(this.get('detail'))) {
      errorHTML = errorHTML + '<p>' + this.get('detail') + '</p>';
    }
    Notify.alert({raw: errorHTML});
  },

  /**
   * report toaster with title and validation messages
   * @param model
   */
    validationReport(model) {
    this.loadError(model);
    var errorHTML = '<h5>' + this.get('title') + '</h5>';
    var validationList = this.get('validationList');
    if (validationList.length > 0) {
      errorHTML = errorHTML.concat('<ul>');
      validationList.forEach(function (item) {
        errorHTML = errorHTML.concat('<li>' + item.message + '</li>');
      });
      errorHTML = errorHTML.concat('</ul>');
    }
    Notify.alert({raw: errorHTML});
  }
});
