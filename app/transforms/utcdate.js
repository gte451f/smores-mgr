import DS from 'ember-data';
import moment from 'moment';

/**
 * this module do the correct transformation
 * between the UTC date coming from the server
 * to a date in js so it can be used by ember
 * without losing the Time Zone information
 */
export default DS.Transform.extend({
  deserialize: function (serialized) {
    if (serialized) {
      return moment(serialized + ' +00:00', 'YYYY-MM-DD HH:mm:ss Z').toDate();
    }
    return serialized;
  },

  serialize: function (deserialized) {
    if (deserialized) {
      return moment(deserialized).utc().format('YYYY-MM-DD HH:mm:ss');
    }
    return deserialized;
  }
});
