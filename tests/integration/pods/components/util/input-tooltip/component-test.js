import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('util/input-tooltip', 'Integration | Component | util/input tooltip', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{util/input-tooltip}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#util/input-tooltip}}
      template block text
    {{/util/input-tooltip}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
