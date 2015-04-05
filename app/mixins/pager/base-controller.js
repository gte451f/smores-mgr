import Ember from 'ember';
import Column from 'smores-mgr/mixins/pager/column';

/**
 * store shared logic to run pager logic
 */
export default Ember.Mixin.create({
    // setup our query params including custom sortField value
    queryParams: ["page", "perPage", "sortField"],

    pageList: [
        5, 10, 25, 50, 100, 250, 500
    ],

    // binding the property on the paged array
    // to the query params on the controller
    pageBinding: "content.page",
    perPageBinding: "content.perPage",
    totalPagesBinding: "content.totalPages",

    //logic to handle sorting a list
    sortField: 'id',
    sortOrder: '', // a - means desc

    // disabled by default
    // set these in the controller to enable and bind to a specific field
    quickSearchField: null,
    quickSearch: null,

    page: 1,
    perPage: 10,
    totalRecords: null,

    column: Ember.Object.extend({
        display: null,
        field: null
    }),

    //load pager specific variables
    columns: [
        Column.create({'displayName': '#', 'fieldName': 'id'})
    ],

    linkPath: "set linkPath in the controller",
    createPath: "set createPath in the controller"
});
