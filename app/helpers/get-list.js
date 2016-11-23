import Ember from 'ember';

const {Helper, isArray} = Ember;

export default Helper.extend({
  compute([list, value]) {
    // console.log('list -> ', list);
    // console.log('value -> ', value);
    if (isArray(value)) {
      return value.map((val) => {
        return list.findBy('value', val);
      });
    } else {
      return list.findBy('value', value);
    }
  }
});
