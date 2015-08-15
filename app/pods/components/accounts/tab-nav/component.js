import Ember from 'ember';

export default Ember.Component.extend({
    tagName: 'ul',
    classNames: ['nav nav-tabs', 'pull-right'],
    isRegistration: '',
    isPayment: '',
    isInfo: '',
    isCard:''
});
