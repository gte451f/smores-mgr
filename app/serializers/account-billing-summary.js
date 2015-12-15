import DS from 'ember-data';

export default DS.ActiveModelSerializer.extend({
  normalize: function (typeClass, hash, prop) {
    hash.account_id = hash.id;
    return this._super(typeClass, hash, prop);
  },
  //http://emberjs.com/blog/2015/06/18/ember-data-1-13-released.html#toc_upgrade-guide
  isNewSerializerAPI: true
});