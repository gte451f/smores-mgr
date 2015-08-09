import Ember from 'ember';

export default Ember.Route.extend({
    activate: function () {
        var add = this.controllerFor('registrations.add');
        var wizardToken = add.get('wizardToken');
        if (wizardToken === 'start') {
            this.transitionTo('registrations.add.step1');
        } else {
            add.set('wizardToken', 'step2');
        }
        return true;
    },

    model: function (params) {
        //params.event_id
        return Ember.RSVP.hash({
            model: {},
            locations: this.store.findAll('location'),
            programs: this.store.findAll('program'),
            events: this.store.findAll('event'),
            sessions: this.store.findAll('session'),
            cabins: this.store.findAll('cabin')
        });
    },
    setupController: function (controller, resolved) {
        this._super(controller, resolved.model);

        // load gender so we can filter cabins
        var step1 = this.controllerFor('registrations.add.step1');
        var gender = step1.get('user.gender');
        //var cabinList = [];
        //resolved.cabins.forEach(function (item) {
        //    if (item.get('gender') === gender || item.get('gender') === 'Mixed') {
        //        cabinList.pushObject(item);
        //    }
        //});

        var modifiedEvents = [];
        resolved.events.forEach(function (item, index, enumerable) {
            //var cabinGender = item.get('cabin').get('gender');
            if (item.get('cabin').get('gender') === gender || item.get('cabin').get('gender') === 'Mixed') {
                item.set('fullName', item.get('program').get('name') + ' / ' + item.get('cabin').get('name'));
                modifiedEvents.addObject(item);
            }
        });

        // tweak location list since it is the only select not driven by a previously selected value
        var locationList = [];
        resolved.locations.forEach(function (item) {
            if (item.get('events').length > 0) {
                locationList.pushObject(item);
            }
        });

        controller.set('locations', locationList);
        controller.set('programs', resolved.programs);
        controller.set('events', modifiedEvents);
        controller.set('sessions', resolved.sessions);
    }
});
