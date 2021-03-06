import Ember from 'ember';
import ENV from 'bill-tracker/config/environment';

export default Ember.Route.extend({
  model: function(params) {
    var lat = params.lat;
    var lng = params.lng;

    var url = 'http://openstates.org/api/v1//legislators/geo/?lat=' + lat +
    '&long=' + lng + '&apikey=' + ENV.OPENSTATES_API_KEY;

    return Ember.$.getJSON(url).then(function(response) {
      return response;
    });
  },

  actions: {
    executeSearch(params) {
      this.transitionTo('search', params.search, params.date);
    },

    submitAddress(params) {
      var self = this;

      var url = 'https://maps.googleapis.com/maps/api/geocode/json?address=' +
        params.address.trim().replace(/([^a-zA-Z0-9*])+/g, "+") + "&key=" + ENV.GOOGLE_GEOCODE_API_KEY;

      Ember.$.getJSON(url)
        .then(function(response) {
          return response.results[0].geometry.location;
        })
        .then(function(location) {
          self.transitionTo('lookup', location.lat, location.lng);
        });
    }
  }
});
