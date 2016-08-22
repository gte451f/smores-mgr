import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('registrations/new-step3', 'Integration | Component | registrations/new step3', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{registrations/new-step3}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#registrations/new-step3}}
      template block text
    {{/registrations/new-step3}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
