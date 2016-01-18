import Ember from 'ember';

export default Ember.Controller.extend({
  queryParams: ['terms'],

  terms: null,

  searchValue: '',

  termsSurrogateChanged: Ember.observer('termsSurrogate', function () {
    var terms = this.get('termsSurrogate');
    var self = this;
    clearTimeout(this.keyDownTimer);
    this.set('keyDownTimer', setTimeout(function () {
      self.set('terms', terms);
    }, 400));
  }),
});
