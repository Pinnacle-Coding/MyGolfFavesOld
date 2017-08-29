
var xml2jsParseString = require('react-native-xml2js').parseString;

var affiliates = [];

/**
 * Generic function for accessing the API
 * @param  String url The given link
 * @param  Function callback A callback function that takes the parameters: error (null if no error), result object
 */
var sendRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.onreadystatechange = (e) => {
    if (request.readyState !== 4) {
      return;
    }
    if (request.status === 200) {
      var response_text = request.responseText;
      xml2jsParseString(response_text, function (err, result) {
          if (err) {
            callback(err, null);
          }
          else {
            var result_text = result['wddxPacket']['data'][0]['string'][0].split('\\').join('\\\\');
            var result_json = JSON.parse(result_text);
            callback(null, result_json);
          }
      });
    }
  }
  request.open('GET', url);
  request.send();
}

module.exports = {

  getAffiliates: function () {
    return affiliates;
  },

  /**
   * Returns a list of nearby affiliates to the user's location in the callback function.
   * @param String memberID The user's ID
   * @param Float locationLat The latitude of the location to search from
   * @param Float locationLong The longitude of the location to search from
   * @param Float radius How far away from the location to search from (maximum)
   * @param Function callback A function taking three arguments: error (or null), message (not null when something went wrong but not an actual error), affiliates (the array containing the raw data from the request)
   */
  getNearbyAffiliates: function (memberID, locationLat, locationLong, locationRadius, callback) {
    sendRequest('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getAffiliates&UID=1&PWD=mob!leMGF&memberID='+memberID+'&referenceLat='+locationLat+'&referenceLong='+locationLong+'&radius='+locationRadius, function (err, result) {
      if (err) {
        callback(err, 'An error occurred', null);
      }
      else if (result.status !== 'success') {
        callback(null, result.message, null);
      }
      else {
        callback(null, null, result.Affiliates);
      }
    })
  },

  /**
   * Called by AuthControl's login method. Populates the service with the user's favorite courses, downloaded from the API.
   * @param String memberID The user's ID
   * @param Function callback A function taking two arguments: error (or null), message (not null when something went wrong but not an actual error)
   */
  onLogin: function(memberID, callback) {
    sendRequest('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getAffiliatesByMemberID&UID=1&PWD=mob!leMGF&memberID='+memberID, function (err, result) {
      if (err) {
        callback(err, 'An error occurred');
      }
      else if (result.status !== 'success') {
        callback(null, result.message);
      }
      else {
        affiliates = result.Affiliates;
        callback(null, null);
      }
    });
  }

}
