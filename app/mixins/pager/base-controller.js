import Ember from 'ember';
import Column from 'smores-mgr/mixins/pager/column';

/**
 * store shared logic to run pager logic
 */
export default Ember.Mixin.create({
    // setup our query params including custom sortField value
    queryParams: ["page", "perPage", "sortField"],

    // binding the property on the paged array
    // to the query params on the controller
    pageBinding: "content.page",
    perPageBinding: "content.perPage",
    totalPagesBinding: "content.totalPages",

    //logic to handle sorting a list
    sortField: 'id',
    sortOrder: '', // a - means desc

    page: 1,
    perPage: 10,

    column: Ember.Object.extend({
        display: null,
        field: null
    }),

    //load pager specific variables
    columns: [
        Column.create({'displayName': '#', 'fieldName': 'id'})
    ],

    linkPath: "SET_ME_IN_CONTROLLER",
    createPath: "SET_ME_IN_CONTROLLER"
});
