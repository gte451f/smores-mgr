import Ember from 'ember';

/**
 * for a given model and pager object
 * return the matching field value
 * @param model
 * @param field
 * @returns {*}
 */
export function pagerLoop(model, field) {
    return model.get(field.fieldName);
}

export default Ember.Handlebars.makeBoundHelper(pagerLoop);