import Ember from 'ember';
import RouteMixin from 'ember-cli-pagination/remote/route-mixin';

/**
 * store additional logic needed to run pager
 * TODO comment
 */
var MixinPaginate = Ember.Mixin.create(RouteMixin, {
    /**
     * set the sortField property as a query param so it will show up in the url
     * refreshModel affects route behavior when the value changes
     */
    queryParams: {
        sortField: {
            refreshModel: true
        }
    },

    //store a reference to the route's model
    //i couldn't figure out how to look this up
    modelName: 'CHANGE ME IN ROUTE',

    //store a reference to the current route, since I don't know how to look this up
    currentRoute: 'CHANGE ME IN THE ROUTE',

    //the name of the current controller since I don't know how to auto detect
    controllerName: function () {
        return this.get('modelName') + 's';
    }.property('modelName'),

    actions: {
        canary: function () {
            console.log('canary in the coal mine!');
        },

        /**
         * take in a sortField and store the new sortField in the controller
         * also infer the correct sort order (ASC or DESC)
         * works with query params
         * follows json:api conventions
         *
         * @param field
         */
        sortField: function (field) {
            field = field.underscore();
            var sortField = this.controller.get('sortField');
            var newSortOrder, sortOrder = this.controller.get('sortOrder');

            //sortField hasn't changed so we toggle sortOrder
            //check for the descending and ascending versions
            if (field === sortField || '-' + field === sortField) {
                if (sortOrder === '-') {
                    newSortOrder = '';
                    this.controller.set('sortOrder', '');
                } else {
                    newSortOrder = '-';
                    this.controller.set('sortOrder', '-');
                }
            } else {
                this.controller.set('sortField', field);
            }
            //this.controller.transitionToRoute(this.get('currentRoute'), {queryParams: {sortField: newSortOrder + field}});
            this.transitionTo(this.get('currentRoute'), {queryParams: {sortField: newSortOrder + field}});
        },

        //refresh the current route by rebuilding based on paginator values
        fetch: function () {
            this.refresh();

            //console.log('routes/***:fetch attempted');
            //var controller = this.controller;
            //
            ////create a hash of default search paramaters
            //var params = {
            //    page: controller.get('page'),
            //    perPage: controller.get('perPage'),
            //    sortField: controller.get('sortField')
            //};
            //
            //this.findPaged(this.modelName, params).then(function (items) {
            //    controller.set('model', items);
            //});
        },

        //general function to open a record from a paginated list
        //will use transitionTo by default
        open: function (record) {
            var controller = this.controller;
            console.log(controller.get('modelName'));
            //my save function
            this.controller.transitionToRoute(controller.get('modelName'), record);

        }
    },

    model: function (params) {
        //console.log('model:params here');
        //console.log(params);
        return this.findPaged(this.modelName, params);
    },

    //extend to pass route values onto controller for possible use
    setupController: function (controller, model) {
        this._super(controller, model);

        //pass route properties on to controller
        controller.set('modelName', this.modelName);
        controller.set('controllerName', this.controllerName);
    }
});

export default MixinPaginate;