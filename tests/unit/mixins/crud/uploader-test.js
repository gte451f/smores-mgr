import Ember from 'ember';
import CrudUploaderMixin from '../../../mixins/crud/uploader';
import { module, test } from 'qunit';

module('CrudUploaderMixin');

// Replace this with your real tests.
test('it works', function(assert) {
  var CrudUploaderObject = Ember.Object.extend(CrudUploaderMixin);
  var subject = CrudUploaderObject.create();
  assert.ok(subject);
});
