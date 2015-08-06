import Ember from 'ember';

export default Ember.Component.extend({
    formalName: function(){
        return this.get('name').capitalize();
    }.property(name)
});
