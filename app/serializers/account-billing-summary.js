import JSONSerializer from 'ember-data/serializers/json';

export default JSONSerializer.extend({
  normalize: function (typeClass, hash, prop) {
    hash.account_id = hash.id;
    return this._super(typeClass, hash, prop);
  },
  //http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_upgrade-guide
  isNewSerializerAPI: true
});
