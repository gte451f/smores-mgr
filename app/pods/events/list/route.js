import Ember from 'ember';
import Paginate from 'smores-mgr/mixins/table-pager/route';

export default Ember.Route.extend(Paginate, {
    modelName: 'event',
    controllerName: 'events.list',
    currentRoute: 'events.list',

    model: function (params) {
        // clear out nulls
        if (Ember.isEmpty(params.location_id) || params.location_id === 'undefined') {
            //unset an empty value
            delete params.location_id;
        }
        if (Ember.isEmpty(params.program_id) || params.program_id === 'undefined') {
            //unset an empty value
            delete params.program_id;
        }
        if (Ember.isEmpty(params.cabin_id) || params.cabin_id === 'undefined') {
            //unset an empty value
            delete params.cabin_id;
        }
        if (Ember.isEmpty(params.session_id) || params.session_id === 'undefined') {
            //unset an empty value
            delete params.session_id;
        }

        return Ember.RSVP.hash({
            model: this.findPaged(this.modelName, params),
            locations: this.store.find('location'),
            programs: this.store.find('program'),
            sessions: this.store.find('session'),
            cabins: this.store.find('cabin')
        });
    },
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);
        controller.set('locations', resolved.locations);
        controller.set('programs', resolved.programs);
        controller.set('cabins', resolved.cabins);
        controller.set('sessions', resolved.sessions);
    },

    actions: {
        processFilter: function () {
            this.fetch();
        }
    },


    //refresh the current route by rebuilding based on existing pager values
    fetch: function () {
        var controller = this.controller;
        var name = controller.get('quickSearchField');
        var value = controller.get('quickSearch');
        var location_id = controller.get('location_id');
        var program_id = controller.get('program_id');
        var session_id = controller.get('session_id');
        var cabin_id = controller.get('cabin_id');


        var params = {
            page: controller.get('page'),
            perPage: controller.get('perPage'),
            sortField: controller.get('sortField')
        };

        if (!Ember.isEmpty(location_id) && location_id !== 'undefined') {
            params['location_id'] = location_id;
        }
        if (!Ember.isEmpty(program_id) && program_id !== 'undefined') {
            params['program_id'] = program_id;
        }
        if (!Ember.isEmpty(cabin_id) && cabin_id !== 'undefined') {
            params['cabin_id'] = cabin_id;
        }
        if (!Ember.isEmpty(session_id) && session_id !== 'undefined') {
            params['session_id'] = session_id;
        }

        if (Ember.typeOf(name) !== 'null' && Ember.typeOf(value) !== 'null') {
            params[name] = value;
        }

        this.findPaged(this.modelName, params).then(function (items) {
            controller.set('model', items);
        });
    }

});
