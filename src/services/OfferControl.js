
var xml2jsParseString = require('react-native-xml2js').parseString;

var offers = [];
var wallet = [];

module.exports = {

  getWallet: function () {
    return wallet;
  },

  populate: function(memberID, callback) {

    var request = new XMLHttpRequest();
    request.onreadystatechange = (e) => {
      if (request.readyState !== 4) {
        return;
      }
      if (request.status === 200) {
        var response_text = request.responseText;
        xml2jsParseString(response_text, function (err, result) {
            if (err) {
              callback(err, 'An error occurred');
            }
            else {
              var result_json = JSON.parse(result['wddxPacket']['data'][0]['string'][0]);
              offers.push.apply(result_json['Offers'])
              callback(null, null);
            }
        });
      }
    }
    request.open('GET', 'http://business.mygolffaves.com/ws/mobilePublicService.cfc?method=getMemberWallet&UID=1&PWD=mob!leMGF&memberID='+memberID);
    request.send();
  }

}
