import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/card-chooser', 'Integration | Component | card/card chooser', {
  integration: true
});

test('it renders', function (assert) {
  this.render(hbs`{{card/card-chooser useNewCard=false}}`);
  assert.equal(this.$('#card-on-file-form label:first').text().trim(), 'Credit Card On File');
});
