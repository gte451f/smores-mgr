import DS from 'ember-data';

export default DS.Model.extend({
    active: DS.attr('boolean'),
    userName: DS.attr('string'),
    password: DS.attr('string')
});
