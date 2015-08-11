import DS from 'ember-data';

export default DS.Model.extend({
    billing: DS.attr('boolean'),
    mailing: DS.attr('boolean'),
    addr_1: DS.attr('string'),
    addr2: DS.attr('string'),
    city: DS.attr('string'),
    state: DS.attr('string'),
    country: DS.attr('string'),
    zip: DS.attr('string'),


    // relationships
    account: DS.belongsTo('account', {
      async: false
    })
});
