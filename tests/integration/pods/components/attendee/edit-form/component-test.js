import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attendee/edit-form', 'Integration | Component | attendee/edit form', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{attendee/add-form title='test attendee edit'}}`);
  assert.equal(this.$('h3.box-title').text().trim(), 'test attendee edit');

});
