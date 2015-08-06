import DS from 'ember-data';

export default DS.Model.extend({
    externalId: DS.attr('string'),
    createdOn: DS.attr('string'),
    settledOn: DS.attr('string'),
    amount: DS.attr('number'),

    // calculated fields
    type: function () {
        if (this.get('check')) {
            return 'Check';
        }
        if (this.get('card')) {
            return 'Credit';
        }
        return 'Cash';
    }.property('card', 'check'),

    // relationships
    account: DS.belongsTo('account'),
    card: DS.belongsTo('card'),
    check: DS.belongsTo('check')
});
