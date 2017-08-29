
var xml2jsParseString = require('react-native-xml2js').parseString;

var offers = [];
var wallet = [];
var selectedOffer = undefined;

/**
 * Generic function for accessing the API
 * @param  {String} url The given link
 * @param  {Function} callback A callback function that takes the parameters: error (null if no error), result object
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

  getCurrentOffers: function () {
    return offers;
  },

  getMemberWallet: function () {
    return wallet;
  },

  getSelectedOffer: function() {
    return selectedOffer;
  },

  /**
   * The user is attempting to redeem an offer.
   * @param {String} offerID The ID of the user's selected offer
   * @param {Function} callback A function taking returned with two arguments: error (or null) and message (not null when something went wrong but not an actual error)
   */
  selectOffer: function (offerID, callback) {
    sendRequest('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getOfferDetail&UID=1&PWD=mob!leMGF&offerID='+offerID, function (err, result) {
      if (err) {
        callback(err, 'An error occurred');
      }
      else if (result.status !== 'success') {
        callback(null, result.message);
      }
      else {
        selectedOffer = result.Details[0];
        callback(null, null);
      }
    });
  },

  /**
   * The user is attempting to redeem selectedOffer.
   * @param {String} userID The user's ID
   * @param {String} redemptionCode The redemption code
   * @param {Number} amount The amount to redeem the offer for
   * @param {Function} callback A function taking returned with two arguments: error (or null) and message (not null when something went wrong but not an actual error)
   */
  redeemOffer: function (userID, redemptionCode, amount, callback) {
    sendRequest('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=redeemOffer&UID=1&PWD=mob!leMGF&memberID='+userID+'&companyID='+selectedOffer.companyID+'&redemptionCode='+redemptionCode+'&offerID='+selectedOffer.offerID+'&amount='+amount, function (err, result) {
      if (err) {
        callback(err, 'An error occurred');
      }
      else if (result.fail) {
        callback(null, result.fail);
      }
      else {
        var ri = -1;
        for (var i = 0; i < wallet.length; i++) {
          if (wallet[i].offerID === selectedOffer.offerID) {
            ri = i;
            break;
          }
        }
        if (ri !== -1) {
          wallet.splice(ri, 1);
        }
        selectedOffer = undefined;
        callback(null, null);
      }
    })
  },

  /**
   * Populates the service with the user's offers, downloaded from the API.
   * @param {String} memberID The user's ID
   * @param {Function} callback A function taking returned with two arguments: error (or null) and message (not null when something went wrong but not an actual error)
   */
  refresh: function(memberID, callback) {
    sendRequest('http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getMemberWallet&UID=1&PWD=mob!leMGF&memberID='+memberID, function (err, result) {
      if (err) {
        callback(err, 'An error occurred');
      }
      else if (result.status !== 'success') {
        callback(null, result.message);
      }
      else {
        wallet = result.Offers;
        if (!wallet) {
          wallet = [];
        }
        callback(null, null);
      }
    });
  }

}
