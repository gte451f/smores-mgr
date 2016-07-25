import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('card/quick-add', 'Integration | Component | card/quick add', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{card/quick-add}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#card/quick-add}}
      template block text
    {{/card/quick-add}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
