import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('registrations/preference-review', 'Integration | Component | registrations/preference review', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{registrations/preference-review}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#registrations/preference-review}}
      template block text
    {{/registrations/preference-review}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
