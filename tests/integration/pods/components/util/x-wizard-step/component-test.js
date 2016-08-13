import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('util/x-wizard-step', 'Integration | Component | util/x wizard step', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{util/x-wizard-step}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#util/x-wizard-step}}
      template block text
    {{/util/x-wizard-step}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
