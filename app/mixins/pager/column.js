import Ember from 'ember';

/**
 * simple helper to store the columns that will be used to for display & search on a paginate list
 */
export default Ember.Object.extend({

    //the friendly name
    displayName: null,

    //the model property
    fieldName: null,

    //list this field in the search component?
    enableSearch: true,

    //list this field in the main listing?
    enableDisplay: true,

    //order in which to display the fields
    order: 0
});