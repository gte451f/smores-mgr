import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('payment/source-chooser', 'Integration | Component | payment/source chooser', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{payment/source-chooser}}`);

  assert.equal(this.$('h3.panel-title span').text().trim(), '#1');
});
