import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attendee/add-form', 'Integration | Component | attendee/add form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{attendee/add-form title='test add attendee'}}`);
  assert.equal(this.$('h3.box-title').text().trim(), 'test add attendee');

});
