import Ember from 'ember';

/**
 * for a given word, capitalize the first letter and return the new word
 * only process a single word
 * @param params
 * @returns {*}
 */
export function capitalizeWord(params/*, hash*/) {
  // check for valid type and return capitalize
  switch (Ember.typeOf(params[0])) {
    case 'string':
      return params[0].capitalize();
    default:
      // otherwise return the original value
      console.log('Invalid argument supplied to capitalizeWord');
      return params[0];
  }

}

export default Ember.Helper.helper(capitalizeWord);

