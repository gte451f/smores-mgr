import {moduleForComponent, test} from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('owner/owner-form', 'Integration | Component | owner/owner form', {
  integration: true
});


test('it renders with some basic checks', function (assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{owner/owner-form}}`);
  assert.equal(this.$('h3.box-title').text().trim(), 'Add New Owner');

  // populate component with some intial values
  let title = 'foobar';
  this.set('title', title);
  this.render(hbs`{{owner/owner-form title=title}}`);
  // verify data is rendered correctly
  assert.equal(this.$('h3.box-title').text().trim(), 'foobar');

  // check that the save button starts as disabled
  assert.equal(this.$('#save-owner').attr('disabled'), 'disabled');
});
