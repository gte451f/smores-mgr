import Ember from 'ember';

export default Ember.Route.extend({

    model: function (params) {
        return Ember.RSVP.hash({
            location: this.store.find('location')
        });
    },

    setupController: function (controller, resolved) {

        this._super(controller, resolved);

        var data1 = {
            labels: ['Day1', 'Day2', 'Day3'],
            series: [
                [5, 4, 8],
                [10, 2, 7],
                [8, 3, 6]
            ]
        };

        var data2 = {
            labels: ['1', '2', '3', '4', '5', '6'],
            series: [
                {
                    name: 'Fibonacci sequence',
                    data: [1, 2, 3, 5, 8, 13]
                },
                {
                    name: 'Golden section',
                    data: [1, 1.618, 2.618, 4.236, 6.854, 11.09]
                }
            ]
        };

        controller.set('model.chartData1', data1);
        controller.set('model.chartData2', data2);
    }
});
