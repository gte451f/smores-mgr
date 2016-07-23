import Ember from 'ember';

const {Helper, isArray} = Ember;

export default Helper.extend({
  compute([target, targetProperty, defaultValue]) {
    // console.log('target -> ', target);
    // console.log('targetProperty -> ', targetProperty);
    // console.log('defaultValue -> ', defaultValue);
    return function (listItem) {
      // debugger;
      if (listItem) {
        // console.log('listItem -> ', listItem.get('display'));
        if (isArray(listItem)) {
          let valueArray = listItem.map((item) => {
            return item.value;
          });
          target.set(targetProperty, valueArray);
        } else {
          target.set(targetProperty, listItem.value);
        }
      } else {
        // console.log('listItem -> was null!');
        target.set(targetProperty, defaultValue);
      }
    };
  }
});
