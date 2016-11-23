import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payment/payment-list', 'Integration | Component | payment/payment list', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{payment/payment-list admin=false}}`);
  assert.equal(this.$('h3.box-title').text().trim(), 'Payments');
});
