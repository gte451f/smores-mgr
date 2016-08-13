import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payment/camp-years', 'Integration | Component | payment/camp years', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{payment/camp-years}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#payment/camp-years}}
      template block text
    {{/payment/camp-years}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
