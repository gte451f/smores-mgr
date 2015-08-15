import Ember from 'ember';

export default Ember.Component.extend({
    formalName: Ember.computed(name, function(){
        return this.get('name').capitalize();
    })
});
