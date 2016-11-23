import Ember from 'ember';

/**
 * this helper function replace the hash.query parameter
 * with a sanitized <i class='highlight'>hash.query</i>
 * tag so it can be styled to show as highlighted
 */
export function highlightResult(params, hash) {
  var phrase = params[0];
  var q = hash.query;
  if (typeof q === 'undefined') {
    return phrase;
  }
  if (Ember.isEmpty(phrase)) {
    return phrase;
  }
  var highlighted = phrase.replace(new RegExp(q.toLowerCase(), 'gi'), function(match) {
    return '<i class="highlight">' + match + '</i>';
  });
  return Ember.String.htmlSafe(highlighted.trim());
}

export default Ember.Helper.helper(highlightResult);