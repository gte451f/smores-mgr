import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('util/validated-select', 'Integration | Component | util/validated select', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{util/validated-select}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#util/validated-select}}
      template block text
    {{/util/validated-select}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
